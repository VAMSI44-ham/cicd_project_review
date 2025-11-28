import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./customercss/CustomerHome.css";

export default function CustomerHome() {
  const navigate = useNavigate();
  const customer = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("customer")) || {};
    } catch (err) {
      return {};
    }
  }, []);

  const quickActions = [
    { label: "Deposit / Withdraw", to: "/customer/deposit-withdraw" },
    { label: "Transfer Funds", to: "/funds" },
    { label: "View Statements", to: "/customer/statements" },
    { label: "Loan Services", to: "/loans" },
    { label: "Manage Profile", to: "/profile" },
    { label: "Notifications", to: "/notifications" },
  ];

  const heroHighlights = [
    { label: "Real-time tracking", description: "Monitor balances and recent activity instantly." },
    { label: "Smart reminders", description: "Never miss EMIs or scheduled transfers again." },
    { label: "Secure access", description: "Multi-layer protection on every device you use." },
    { label: "Priority support", description: "Reach dedicated support with a single tap." },
  ];

  return (
    <div className="customer-home">
      <section className="customer-hero">
        <div>
          <p className="eyebrow">Customer Portal</p>
          <h1>
            Welcome back,{" "}
            <span>{customer?.fullName ? customer.fullName.split(" ")[0] : "Customer"}</span>
          </h1>
          <p className="hero-copy">
            Track balances, transfer funds, pay loans, and stay on top of notifications—all from one unified
            workspace tailored for you.
          </p>
          <div className="hero-actions">
            <button className="hero-btn primary" onClick={() => navigate("/customer/deposit-withdraw")}>
              Manage Money
            </button>
            <button className="hero-btn outline" onClick={() => navigate("/notifications")}>
              View Notifications
            </button>
          </div>
        </div>
        <div className="hero-cards">
          {heroHighlights.map((item) => (
            <div key={item.label} className="hero-card">
              <p className="card-label">{item.label}</p>
              <p className="card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.to} className="action-card">
              <span>{action.label}</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          ))}
        </div>
      </section>

      <section className="insight-panel">
        <div className="insight-card">
          <h3>Recent Transactions</h3>
          <p>Stay updated with your last 10 transactions and download PDF statements whenever you need.</p>
          <button onClick={() => navigate("/customer/statements")}>Open Statements</button>
        </div>
        <div className="insight-card">
          <h3>Loans snapshot</h3>
          <p>Keep track of ongoing loans, EMIs, and explore new offers curated for loyal customers.</p>
          <button onClick={() => navigate("/loans")}>Review Loans</button>
        </div>
      </section>
    </div>
  );
}

