import {Button} from "@/components/ui/button";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getOneDevis} from "@/services/data/data-devis";
import ModalTrigger from "@/components/ModalTrigger";
import {formatDate, stringAdresseRue, stringAdresseVille, transformPriceToEuro} from "@/services/lib/utils";
import {CircleCheckBig, CircleDashed} from "lucide-react";
import PrestationModalTrigger from "@/components/PrestationModalTrigger";
import PdfTemplate from "@/components/pdf-template";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

export default function DevisDetailPage() {
    const {id} = useParams();
    const [devis, setDevis] = useState<Devis | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const updatedParams = new URLSearchParams(location.search);
    const updated = updatedParams.get('updated') || "";

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getOneDevis(Number(id)); // Récupère le devis
                if (result.ok) {
                    setDevis(result.data);
                } else {
                    setErrorMessage(result.message);
                }
            } catch (error) {
                setErrorMessage("Erreur lors de la récupération du devis.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [id, updated]);

    if (isLoading) {
        return <div>Chargement...</div>; // Affiche un indicateur de chargement
    }

    if (!devis) {
        return <div>Aucun devis trouvé.</div>; // Si devis est null, affiche un message d'erreur
    }

    const { entreprise, prestations, tc, paidAt } = devis;

    const {
        entrepriseNom,
        entrepriseAdresseRue,
        entrepriseAdresseVille,
        clientNom,
        clientPrenom,
        clientAdresseRue,
        clientAdresseVille,
        contactClient,
        // createdAtDate,
        updatedAtDate,
        paidAtDate,
        debutAtDate,
        validite,
        prixHtCalcule,
        tvaCalcule,
        totalTTCCalcule,
    } = formatDevisData(devis);

    const paid = paidAt ? "checked" : "";

    const handleDownload = async () => {
        const section = document.getElementById('pdf-section');
        section.style.display = "block";
        const input = document.getElementById('pdf-content');
        const canvas = await html2canvas(input, {
            scale: 2, // Augmente la résolution pour une meilleure qualité
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0,pageWidth, pageHeight);
        pdf.save(`${devis.reference}.pdf`);
        section.style.display = "none";
    };

    return (
        <main id={"devis-" + id} className="flex flex-col items-between justify-start p-4 w-full">
            <section id={"devis-actions-section"} className={"flex items-center justify-between gap-4 p-4"}>
                <a href={"/devis"}><Button>Retour aux devis</Button></a>
                <ModalTrigger devisData={devis} id={Number(id)} />
            </section>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <Button className="hidden lg:block" onClick={handleDownload}>Télécharger PDF</Button>

            <div id={"pdf-section"} style={{ display: "none" }}>
                <PdfTemplate data={devis} formatData={formatDevisData(devis)}/>
            </div>

            <section id={"top section"} className={"flex items-start justify-between w-full mb-8 p-4"}>
                <div id={"entreprise-adresse-section"}>
                    {entreprise && (
                        <>
                            <p>{entrepriseNom}</p>
                            {entreprise.contact && <p>{entreprise.contact}</p>}
                            <p>{entrepriseAdresseRue}</p>
                            <p>{entrepriseAdresseVille}</p>
                        </>
                    )}
                </div>
                <div className={"flex gap-4"}>
                    <h1 className="text-4xl font-bold capitalize">{devis?.reference}</h1>
                    <div className="flex flex-wrap items-center text-base font-semibold text-gray-900 dark:text-white">
                        <div className="justify-center">
                            <div className="form-control">
                                <label className="label">
                                    {!paid && <CircleDashed className=""/>}
                                    {paid && <CircleCheckBig className="text-green-500"/>}
                                    {/*TODO: updater le logo au changement*/}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id={"devis-details"} className={"flex flex-wrap items-start justify-between w-full mb-8 p-4 gap-4"}>
                <div id={"devis-infos"} className={"bordered rounded bg-base-100 p-4 flex flex-col items-between justify-start gap-4"}>
                    <div className={"flex flex-wrap justify-between items-center gap-x-4"}>
                        <p>Référence: </p>
                        <p>{devis?.reference}</p>
                    </div>

                    <div className={"flex flex-wrap justify-between items-center gap-x-4"}>
                        <p>Date du devis: </p>
                        <p>{updatedAtDate}</p>
                    </div>

                    <div className={"flex flex-wrap justify-between items-center gap-x-4"}>
                        <p>Date de début de la prestation: </p>
                        <p>{debutAtDate}</p>
                    </div>

                    <div className={"flex flex-wrap justify-between items-center gap-x-4"}>
                        <p>Date de validité: </p>
                        <p>{validite}</p>
                    </div>

                    <div className={"flex flex-wrap justify-between items-center gap-x-4"}>
                        <p>Contact client: </p>
                        <p>{contactClient}</p>
                    </div>
                </div>
                <div id={"infos-client"}>
                    <h2 className={"underline mb-4"}>Destinataire :</h2>
                    <p className={"capitalize"}><span className={"uppercase"}>{clientNom}</span> {clientPrenom}</p>
                    <p>{clientAdresseRue}</p>
                    <p>{clientAdresseVille}</p>
                </div>
            </section>

            <section id={"tc-section"} className={"p-4 flex flex-col items-start justify-start w-full mb-8"}>
                <h2 className={"underline mb-4"}>Termes et conditions</h2>
                <div className={"bg-base-100 rounded w-full min-h-32 p-4"}>{tc}</div>
            </section>

            <section id="prestations-section" className="w-full border flex flex-col lg:flex-wrap lg:flex-row lg:justify-center lg:gap-5">
                <div className="hidden lg:grid lg:grid-cols-8 lg:items-end lg:justify-items-center lg:border-b lg:bg-base-100 lg:p-4 lg:w-full">
                    <p>Description</p>
                    <p>Quantité</p>
                    <p>Prix unitaire HT</p>
                    <p>Total HT</p>
                    <p>TVA %</p>
                    <p>TVA</p>
                    <p>Total TTC</p>
                    <p></p>
                </div>
                {prestations && prestations.map((prestation: Prestation) =>{
                    return (
                        <div key={prestation.id} className={`w-full p-4 ${
                            "lg:grid lg:grid-cols-8 lg:gap-x-2 lg:items-center lg:justify-items-center lg:border-none"
                        } ${
                            "border flex flex-col gap-y-2"
                        }`}
                        >
                            <p className="font-bold lg:font-normal">{prestation.element.nom}</p>
                            <PrestationCard nom={"Quantité:"} valeur={prestation.qty.toString()} />
                            <PrestationCard nom={"Prix Unitaire HT:"} valeur={transformPriceToEuro(prestation.prixHT)} />
                            <PrestationCard nom="Total HT" valeur={transformPriceToEuro(prestation.totalHT ?? 0)} />
                            <PrestationCard nom="Pourcentage de TVA:" valeur={prestation.tvaPercentage + "%"} />
                            <PrestationCard nom="TVA: " valeur={transformPriceToEuro(prestation.tva ?? 0)} />
                            <PrestationCard nom="Total TTC:" valeur={transformPriceToEuro(prestation.totalTTC ?? 0)} classname="font-bold" />

                            <div className={`lg:hidden flex items-center gap-x-4 justify-center`}>
                                <PrestationModalTrigger isEditPrestation={prestation} id={Number(id)} />
                            </div>
                            <div className={"hidden lg:block"}><PrestationModalTrigger isEditPrestation={prestation} id={Number(id)} /></div>
                        </div>
                    )
                })}
            </section>
            <div className={"ml-4 mt-4"}><PrestationModalTrigger isEditPrestation={null} id={Number(id)}/></div>

            <section id={"prix-section"} className={"grid grid-cols-2 gap-x-4 items-end justify-items-end ml-auto mb-8 p-4"}>
                <div className="text-right">
                    <p>Total HT: </p>
                    <p>TVA: </p>
                    <p>Total TTC: </p>
                    {paidAtDate && <p className={"underline"}>Payé le: </p>}
                </div>
                <div className="text-right">
                    <p className={""}>{prixHtCalcule}</p>
                    <p>{tvaCalcule}</p>
                    <p className={"font-bold"}>{totalTTCCalcule}</p>
                    {paidAtDate && <p>{paidAtDate}</p>}
                </div>
            </section>

            <section id={"bottom-section"} className={"flex items-start justify-between w-full p-4"}>
                <div id={"entreprise-infos-section"}>
                    <p>Siret: {entreprise.siret}</p>
                    {entreprise.codeApe && <p>Code APE: {entreprise.codeApe}</p>}
                    {entreprise.tvaIntracom && <p>Numéro de TVA intracommunautaire: {entreprise.tvaIntracom}</p>}
                </div>
                <div id={"contact-section"}>
                    {entreprise.contact && <p className={"capitalize"}>{entreprise.contact}</p>}
                    {entreprise.web && <p><a href={entreprise.web} target={"blank"} className={"underline"}>{entreprise.web}</a></p>}
                    {entreprise.email && <p><a href={"mailto:" + entreprise.email}>{entreprise.email}</a></p>}
                    {entreprise.telephone1 && <p>Téléphone 1: {entreprise.telephone1}</p>}
                    {entreprise.telephone2 && <p>Téléphone2: {entreprise.telephone2}</p>}
                </div>
            </section>
        </main>
    )
}

function PrestationCard({ nom, valeur, classname }: { nom: string, valeur: string, classname?: string }) {
    return (
        <>
            <div className={`lg:hidden flex items-center gap-x-4 justify-center`}>
                <p >{nom}</p>
                <p className={classname}>{valeur}</p>
            </div>
            <p className={"hidden lg:block"}>{valeur}</p>
        </>
    )
}

function formatDevisData(devis: Devis) {
    if (!devis) {
        return {
            entrepriseNom: "",
            entrepriseAdresseRue: "",
            entrepriseAdresseVille: "",
            clientNom: "",
            clientPrenom: "",
            clientAdresseRue: "",
            clientAdresseVille: "",
            contactClient: "Contact non disponible",
            createdAtDate: "",
            updatedAtDate: "",
            paidAtDate: null,
            debutAtDate: "À définir",
            validite: "",
            prixHtCalcule: 0,
            tvaCalcule: 0,
            totalTTCCalcule: 0,
            prestations: "",
            tc: "",
            paid: ""
        };
    }

    const { entreprise, client, prestations, tc, paidAt, dateDebutPrestation, dateValidite, totalHT, tva, totalTTC, createdAt, updatedAt } = devis;

    const entrepriseAdresseRue = entreprise?.adresse ? stringAdresseRue(entreprise.adresse) : "";
    const entrepriseAdresseVille = entreprise?.adresse ? stringAdresseVille(entreprise.adresse) : "";
    const clientAdresseRue = client?.adresse ? stringAdresseRue(client.adresse) : "";
    const clientAdresseVille = client?.adresse ? stringAdresseVille(client.adresse) : "";
    const contactClient = client?.email || client?.telephone || "Contact non disponible";
    const paid = paidAt ? "checked" : ""

    return {
        entrepriseNom: entreprise?.nom || "",
        entrepriseAdresseRue,
        entrepriseAdresseVille,
        clientNom: client?.nom || "",
        clientPrenom: client?.prenom || "",
        clientAdresseRue,
        clientAdresseVille,
        contactClient,
        createdAtDate: formatDate(createdAt ?? ''),
        updatedAtDate: updatedAt ? formatDate(updatedAt) : formatDate(createdAt ?? ''),
        paidAtDate: paidAt ? formatDate(paidAt) : null,
        debutAtDate: dateDebutPrestation ? formatDate(dateDebutPrestation) : "À définir",
        validite: formatDate(dateValidite ?? ''),
        prixHtCalcule: transformPriceToEuro(totalHT ?? 0),
        tvaCalcule: transformPriceToEuro(tva ?? 0),
        totalTTCCalcule: transformPriceToEuro(totalTTC ?? 0),
        prestations,
        tc,
        paid
    };
}
