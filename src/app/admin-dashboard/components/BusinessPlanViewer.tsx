import { BUSINESS_PLAN_CONTENT } from "../../../data/business-plan-content";

export default function BusinessPlanViewer() {
    return (
        <div className="business-plan-container fade-in">
            <h3 className="section-title">Plano de Negócios</h3>
            <div className="document-paper">
                <pre className="document-content">
                    {BUSINESS_PLAN_CONTENT}
                </pre>
            </div>
            <style jsx>{`
                .business-plan-container {
                    padding-bottom: 4rem;
                }
                .section-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    color: #1a1a1a;
                }
                .document-paper {
                    background: white;
                    padding: 4rem;
                    max-width: 900px;
                    margin: 0 auto;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    border-radius: 4px; /* Slightly rounded, but paper-like */
                }
                .document-content {
                    white-space: pre-wrap;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: #333;
                }
            `}</style>
        </div>
    );
}
