
export type Translation = {
    nav: {
        home: string;
        architecture: string;
        visualization: string;
        projects: string;
        about: string;
        contact: string;
        clientArea: string;
    };
    hero: {
        architecture: string;
        interiors: string;
        visualization: string;
        comparisonTitle: string;
        viewArchitecture: string;
        viewVisualization: string;
        dragHint: string;
    };
    about: {
        title: string;
        p1: string;
        p2: string;
        p3: string;
        signatureAlt: string;
        name: string;
        role: string;
        bio1: string;
        bio2: string;
        bio3: string;
        portfolio: string;
    };
    services: {
        title: string;
        subtitle: string;
        items: {
            architecture: { title: string; desc: string };
            interiors: { title: string; desc: string };
            lighting: { title: string; desc: string };
            management: { title: string; desc: string };
            suppliers: { title: string; desc: string };
            supervision: { title: string; desc: string };
            visualization: { title: string; desc: string };
        };
        cta: string;
        viewProjects: string;
    };
    contact: {
        title: string;
        namePlaceholder: string;
        emailPlaceholder: string;
        messagePlaceholder: string;
        sendButton: string;
    };
    projects: {
        academic: string;
        selected: string;
        categories: {
            residential: string;
            commercial: string;
            academic: string;
        };
        details: {
            loftA: { desc1: string; desc2: string };
            casaArcos: { desc1: string; desc2: string };
            quartaEsquina: { desc1: string; desc2: string };
        };
    };
    visualization: {
        hero: {
            subtitle: string;
            title: string;
            desc: string;
        };
        services: {
            subtitle: string;
            title: string;
            items: {
                render: { title: string; desc: string };
                plans: { title: string; desc: string };
                diagrams: { title: string; desc: string };
                consulting: { title: string; desc: string };
                artistic: { title: string; desc: string };
            }
        };
        cta: {
            button: string;
            projects: string;
        }
    };
    architecturePage: {
        hero: {
            title: string;
            subtitle: string;
        }
    };
};
