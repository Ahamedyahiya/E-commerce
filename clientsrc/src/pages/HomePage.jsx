// import { useEffect, useState } from "react";
// import { getAllProducts } from "../service/productservice";
// import ProductCard from "../components/ProductCart/ProductCart";
// import { useSearch } from "../context/SearchContext"; 

// function HomePage() {
//   const [products, setProducts] = useState([]);
//   const { search } = useSearch(); 

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await getAllProducts();
//       setProducts(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ✅ FILTER LOGIC
//   const filteredProducts = products.filter((item) =>
//     item.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container mt-5">
//       <div className="row g-5">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((item) => (
//             <ProductCard key={item._id} item={item} />
//           ))
//         ) : (
//           <h4 className="text-center">No products found 😢</h4>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HomePage;












import { useEffect, useState } from "react";
import { getAllProducts } from "../service/productservice";
import ProductCard from "../components/ProductCart/ProductCart";
import { useSearch } from "../context/SearchContext";

const banners = [
  {
    id: 1,
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    tag: "🔥 Big Billion Days",
    title: "Up to 80% OFF",
    subtitle: "On Electronics, Fashion & More",
    accent: "#635bff",
    emoji: "📱",
  },
  {
    id: 2,
    bg: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    tag: "⚡ Flash Sale",
    title: "Buy 1 Get 1 FREE",
    subtitle: "Limited time offer — Don't miss it!",
    accent: "#f59e0b",
    emoji: "👟",
  },
  {
    id: 3,
    bg: "linear-gradient(135deg, #1a0533 0%, #3b0764 50%, #6b21a8 100%)",
    tag: "🎁 New Arrivals",
    title: "Fresh Drops Daily",
    subtitle: "Exclusive deals just for you",
    accent: "#a78bfa",
    emoji: "👜",
  },
  {
    id: 4,
    bg: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)",
    tag: "🛒 Super Saver",
    title: "Grab Before It's Gone",
    subtitle: "Lowest prices of the season",
    accent: "#34d399",
    emoji: "⌚",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const prev = () => goTo((current - 1 + banners.length) % banners.length);
  const next = () => goTo((current + 1) % banners.length);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const b = banners[current];

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "260px",
      borderRadius: "20px",
      overflow: "hidden",
      marginBottom: "40px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    }}>
      {/* Slide */}
      <div style={{
        width: "100%", height: "100%",
        background: b.bg,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        opacity: animating ? 0 : 1,
        transform: animating ? "scale(0.98)" : "scale(1)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        {/* Left Content */}
        <div>
          <div style={{
            display: "inline-block",
            background: b.accent + "33",
            border: `1px solid ${b.accent}66`,
            color: b.accent,
            fontSize: "12px", fontWeight: 700,
            letterSpacing: "1px", padding: "5px 14px",
            borderRadius: "50px", marginBottom: "14px",
            fontFamily: "'Segoe UI', sans-serif",
          }}>{b.tag}</div>

          <h2 style={{
            fontSize: "38px", fontWeight: 900,
            color: "#ffffff", margin: "0 0 8px",
            fontFamily: "'Segoe UI', sans-serif",
            lineHeight: 1.1,
            textShadow: `0 0 40px ${b.accent}66`,
          }}>{b.title}</h2>

          <p style={{
            fontSize: "15px", color: "#ffffffaa",
            margin: "0 0 22px",
            fontFamily: "'Segoe UI', sans-serif",
          }}>{b.subtitle}</p>

          <button style={{
            background: b.accent,
            color: "#fff", border: "none",
            padding: "10px 28px", borderRadius: "50px",
            fontSize: "14px", fontWeight: 700,
            cursor: "pointer", letterSpacing: "0.5px",
            boxShadow: `0 4px 20px ${b.accent}66`,
            fontFamily: "'Segoe UI', sans-serif",
          }}>Shop Now →</button>
        </div>

        {/* Right Emoji */}
        <div style={{
          fontSize: "110px", lineHeight: 1,
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
          userSelect: "none",
        }}>{b.emoji}</div>

        {/* Decorative circles */}
        <div style={{
          position: "absolute", right: "180px", top: "-40px",
          width: "180px", height: "180px", borderRadius: "50%",
          background: b.accent + "15", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: "120px", bottom: "-60px",
          width: "240px", height: "240px", borderRadius: "50%",
          background: b.accent + "10", pointerEvents: "none",
        }} />
      </div>

      {/* Prev / Next Arrows */}
      {[{ dir: "prev", pos: "16px", symbol: "‹", fn: prev },
        { dir: "next", pos: "auto", right: "16px", symbol: "›", fn: next }
      ].map(({ dir, pos, right, symbol, fn }) => (
        <button key={dir} onClick={fn} style={{
          position: "absolute", top: "50%",
          left: dir === "prev" ? pos : "auto",
          right: dir === "next" ? "16px" : "auto",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff", width: "40px", height: "40px",
          borderRadius: "50%", fontSize: "22px",
          cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
          zIndex: 10,
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >{symbol}</button>
      ))}

      {/* Dots */}
      <div style={{
        position: "absolute", bottom: "14px", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: "8px", zIndex: 10,
      }}>
        {banners.map((_, i) => (
          <div key={i} onClick={() => goTo(i)} style={{
            width: i === current ? "24px" : "8px",
            height: "8px", borderRadius: "50px",
            background: i === current ? b.accent : "rgba(255,255,255,0.4)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const [products, setProducts] = useState([]);
  const { search } = useSearch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* 🔥 Carousel */}
      <Carousel />

      {/* Products Grid */}
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))
        ) : (
          <h4 className="text-center">No products found 😢</h4>
        )}
      </div>
    </div>
  );
}

export default HomePage;