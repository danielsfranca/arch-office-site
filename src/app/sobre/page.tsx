import Image from "next/image";

export default function SobrePage() {
    return (
        <main className="w-full pt-32 pb-20 bg-white text-black min-h-screen">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    {/* Text */}
                    <div className="flex-1 space-y-6 text-[12px] font-light leading-relaxed text-[#555] opacity-85">
                        <h1 className="text-3xl font-light mb-8 uppercase tracking-widest">Sobre o Estúdio</h1>
                        <p>
                            <strong>Daniel França Arquitetura</strong> é um estúdio dedicado à criação de espaços que transcendem a função.
                            Com uma abordagem minimalista e rigorosa, buscamos a essência de cada projeto, eliminando o supérfluo para revelar o essencial.
                        </p>
                        <p>
                            O escritório atua na interseção entre a técnica construtiva e a poética do habitar. Acreditamos que a arquitetura deve ser silenciosa visualmente, servindo como pano de fundo para a vida.
                        </p>
                        <p>
                            Nosso processo de trabalho integra a visualização arquitetônica (Archviz) desde as primeiras etapas,
                            não apenas como ferramenta de venda, mas como instrumento de projeto, permitindo um controle preciso da luz, dos materiais e da atmosfera final.
                        </p>
                    </div>

                    {/* Photo */}
                    <div className="flex-1 w-full max-w-md relative aspect-[3/4] bg-gray-100 self-center md:self-start overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800" // Placeholder portrait
                            alt="Daniel França"
                            fill
                            style={{ objectFit: "cover" }}
                            className="grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
