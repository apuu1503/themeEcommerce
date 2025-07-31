import { useEffect, useState } from "react";
import { Palette, Sun, Moon, Heart, Search, Filter } from "lucide-react";
import Navbar from "./Navbar";

interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
}

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [currentTheme, setCurrentTheme] = useState("theme1");
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const themes = {
        theme1: {
            name: "Clean Light",
            icon: Sun,
            description: "Modern & Minimal"
        },
        theme2: {
            name: "Dark Pro",
            icon: Moon,
            description: "Professional Dark"
        },
        theme3: {
            name: "Warm Cozy",
            icon: Heart,
            description: "Playful & Friendly"
        }
    };

    useEffect(() => {
        const root = document.documentElement;
        root.className = currentTheme;

        const themeStyles = {
            theme1: {
                '--font': "'Inter', sans-serif",
                '--bg': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                '--text': '#1e293b',
                '--card-bg': '#ffffff',
                '--card-shadow': '0 10px 25px rgba(0, 0, 0, 0.1)',
                '--card-hover-shadow': '0 20px 40px rgba(0, 0, 0, 0.15)',
                '--accent': '#3b82f6',
                '--accent-hover': '#2563eb',
                '--border': '#e2e8f0',
                '--input-bg': '#ffffff',
                '--input-border': '#d1d5db',
                '--input-focus': '#3b82f6'
            },
            theme2: {
                '--font': "'Merriweather', serif",
                '--bg': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                '--text': '#e2e8f0',
                '--card-bg': 'linear-gradient(145deg, #1e293b, #334155)',
                '--card-shadow': '0 10px 25px rgba(0, 0, 0, 0.3)',
                '--card-hover-shadow': '0 20px 40px rgba(0, 0, 0, 0.4)',
                '--accent': '#8b5cf6',
                '--accent-hover': '#7c3aed',
                '--border': '#334155',
                '--input-bg': '#334155',
                '--input-border': '#475569',
                '--input-focus': '#8b5cf6'
            },
            theme3: {
                '--font': "'Pacifico', cursive",
                '--bg': 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
                '--text': '#334155',
                '--card-bg': 'linear-gradient(145deg, #fffbeb, #fef3c7)',
                '--card-shadow': '0 10px 25px rgba(245, 158, 11, 0.2)',
                '--card-hover-shadow': '0 20px 40px rgba(245, 158, 11, 0.3)',
                '--accent': '#f59e0b',
                '--accent-hover': '#d97706',
                '--border': '#fed7aa',
                '--input-bg': '#fffbeb',
                '--input-border': '#fbbf24',
                '--input-focus': '#f59e0b'
            }
        };

        Object.entries(themeStyles[currentTheme]).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });

        if (!document.querySelector('#theme-fonts')) {
            const link = document.createElement('link');
            link.id = 'theme-fonts';
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&family=Pacifico&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }, [currentTheme]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products?limit=20")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                // Extract unique categories
                const uniqueCategories = ["all", ...Array.from(new Set(data.map(p => p.category)))];
                setCategories(uniqueCategories);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        let temp = [...products];
        
        // Filter by category
        if (selectedCategory !== "all") {
            temp = temp.filter(p => p.category === selectedCategory);
        }
        
        // Filter by search term (only search in title)
        if (search.trim()) {
            temp = temp.filter(p => 
                p.title.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        setFilteredProducts(temp);
    }, [search, selectedCategory, products]);

    const ThemeTab = ({ themeKey, theme, isActive, onClick }) => {
        const Icon = theme.icon;
        return (
            <button
                onClick={() => onClick(themeKey)}
                className={`theme-tab ${isActive ? 'active' : ''}`}
            >
                <Icon size={18} /> {theme.name}
            </button>
        );
    };

    return (
        <div className="main-container">
            {/* <Navbar /> */}
            <div className="content-wrapper">
                {/* Header Section */}
                <div className="header-section">
                    <div className="title-section">
                        <h1 className="main-title">Shop the Collection</h1>
                        <p className="subtitle">Discover amazing products curated just for you</p>
                    </div>
                    <div className="theme-tabs">
                        {Object.entries(themes).map(([key, theme]) => (
                            <ThemeTab
                                key={key}
                                themeKey={key}
                                theme={theme}
                                isActive={currentTheme === key}
                                onClick={setCurrentTheme}
                            />
                        ))}
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="filters-section">
                    <div className="search-container">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search product titles..."
                            className="search-input"
                        />
                    </div>
                    <div className="category-container">
                        <Filter size={20} className="filter-icon" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="category-select"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="results-count">
                        {!loading && `${filteredProducts.length} products found`}
                    </div>
                </div>

                {/* Products Section */}
                {loading ? (
                    <div className="loading-grid">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="loading-card">
                                <div className="loading-image"></div>
                                <div className="loading-content">
                                    <div className="loading-title"></div>
                                    <div className="loading-desc"></div>
                                    <div className="loading-price"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h3>No products found</h3>
                        <p>Try adjusting your search terms or category filter</p>
                        <button 
                            onClick={() => {setSearch(""); setSelectedCategory("all");}}
                            className="reset-filters-btn"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="gridprod">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="prodcontainer">
                                <div className="image-section">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="imageprod"
                                    />
                                    <div className="category-badge">
                                        {product.category}
                                    </div>
                                </div>
                                <div className="prodtext">
                                    <h2 className="product-title">{product.title}</h2>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-footer">
                                        <span className="product-price">${product.price}</span>
                                        <button className="add-to-cart-btn">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                * {
                    box-sizing: border-box;
                }

                .main-container {
                    min-height: 100vh;
                    background: var(--bg);
                    font-family: var(--font);
                    color: var(--text);
                    transition: all 0.3s ease;
                }

                .content-wrapper {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                /* Header Styles */
                .header-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .title-section {
                    flex: 1;
                }

                .main-title {
                    font-size: 3rem;
                    font-weight: 700;
                    margin: 0 0 0.5rem 0;
                    background: linear-gradient(45deg, var(--accent), var(--accent-hover));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .subtitle {
                    font-size: 1.1rem;
                    opacity: 0.8;
                    margin: 0;
                }

                .theme-tabs {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .theme-tab {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.25rem;
                    border: 2px solid var(--border);
                    background: var(--card-bg);
                    color: var(--text);
                    border-radius: 50px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: var(--font);
                }

                .theme-tab:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--card-shadow);
                }

                .theme-tab.active {
                    background: var(--accent);
                    color: white;
                    border-color: var(--accent);
                    transform: translateY(-2px);
                    box-shadow: var(--card-hover-shadow);
                }

                /* Filters Styles */
                .filters-section {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 3rem;
                    align-items: center;
                    flex-wrap: wrap;
                    background: var(--card-bg);
                    padding: 1.5rem;
                    border-radius: 20px;
                    box-shadow: var(--card-shadow);
                }

                .search-container, .category-container {
                    position: relative;
                    flex: 1;
                    min-width: 250px;
                }

                .search-icon, .filter-icon {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text);
                    opacity: 0.6;
                    z-index: 1;
                }

                .search-input, .category-select {
                    width: 100%;
                    padding: 1rem 1rem 1rem 3rem;
                    border: 2px solid var(--input-border);
                    background: var(--input-bg);
                    color: var(--text);
                    border-radius: 15px;
                    font-size: 1rem;
                    font-family: var(--font);
                    transition: all 0.3s ease;
                }

                .search-input:focus, .category-select:focus {
                    outline: none;
                    border-color: var(--input-focus);
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .results-count {
                    font-weight: 600;
                    color: var(--accent);
                    white-space: nowrap;
                    padding: 0.5rem 1rem;
                    background: rgba(59, 130, 246, 0.1);
                    border-radius: 10px;
                }

                /* Products Grid */
                .gridprod {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                .prodcontainer {
                    display: flex;
                    background: var(--card-bg);
                    border-radius: 25px;
                    overflow: hidden;
                    box-shadow: var(--card-shadow);
                    transition: all 0.4s ease;
                    border: 1px solid var(--border);
                    position: relative;
                }

                .prodcontainer:hover {
                    transform: translateY(-10px);
                    box-shadow: var(--card-hover-shadow);
                }

                .image-section {
                    position: relative;
                    width: 200px;
                    min-width: 200px;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,252,0.9));
                }

                .imageprod {
                    width: 150px;
                    height: 150px;
                    object-fit: contain;
                    border-radius: 15px;
                    transition: transform 0.3s ease;
                }

                .prodcontainer:hover .imageprod {
                    transform: scale(1.05);
                }

                .category-badge {
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    background: var(--accent);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 15px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: capitalize;
                }

                .prodtext {
                    flex: 1;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .product-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 0 0 1rem 0;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .product-description {
                    font-size: 0.9rem;
                    opacity: 0.8;
                    margin: 0 0 1.5rem 0;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .product-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem;
                }

                .product-price {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--accent);
                }

                .add-to-cart-btn {
                    background: var(--accent);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: var(--font);
                }

                .add-to-cart-btn:hover {
                    background: var(--accent-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }

                /* Loading States */
                .loading-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
                    gap: 2rem;
                }

                .loading-card {
                    display: flex;
                    background: var(--card-bg);
                    border-radius: 25px;
                    overflow: hidden;
                    box-shadow: var(--card-shadow);
                    border: 1px solid var(--border);
                }

                .loading-image {
                    width: 200px;
                    min-width: 200px;
                    height: 200px;
                    background: linear-gradient(90deg, var(--border) 25%, rgba(255,255,255,0.5) 50%, var(--border) 75%);
                    background-size: 200% 100%;
                    animation: loading 1.5s infinite;
                }

                .loading-content {
                    flex: 1;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .loading-title, .loading-desc, .loading-price {
                    background: linear-gradient(90deg, var(--border) 25%, rgba(255,255,255,0.5) 50%, var(--border) 75%);
                    background-size: 200% 100%;
                    animation: loading 1.5s infinite;
                    border-radius: 8px;
                }

                .loading-title {
                    height: 1.5rem;
                    width: 80%;
                }

                .loading-desc {
                    height: 3rem;
                    width: 100%;
                }

                .loading-price {
                    height: 1rem;
                    width: 60%;
                }

                @keyframes loading {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }

                /* No Results */
                .no-results {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: var(--card-bg);
                    border-radius: 25px;
                    box-shadow: var(--card-shadow);
                }

                .no-results-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }

                .no-results h3 {
                    font-size: 1.5rem;
                    margin: 0 0 0.5rem 0;
                    color: var(--text);
                }

                .no-results p {
                    opacity: 0.8;
                    margin: 0 0 2rem 0;
                }

                .reset-filters-btn {
                    background: var(--accent);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: var(--font);
                    transition: all 0.3s ease;
                }

                .reset-filters-btn:hover {
                    background: var(--accent-hover);
                    transform: translateY(-2px);
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .content-wrapper {
                        padding: 1rem;
                    }

                    .header-section {
                        flex-direction: column;
                        text-align: center;
                        gap: 2rem;
                    }

                    .main-title {
                        font-size: 2rem;
                    }

                    .filters-section {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .search-container, .category-container {
                        min-width: unset;
                    }

                    .gridprod {
                        grid-template-columns: 1fr;
                    }

                    .prodcontainer {
                        flex-direction: column;
                    }

                    .image-section {
                        width: 100%;
                        min-width: unset;
                        padding: 2rem;
                    }

                    .imageprod {
                        width: 200px;
                        height: 200px;
                    }

                    .prodtext {
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .main-title {
                        font-size: 1.5rem;
                    }

                    .theme-tabs {
                        justify-content: center;
                    }

                    .theme-tab {
                        padding: 0.5rem 1rem;
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;