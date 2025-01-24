import React from 'react';
import {CircleCheckBig, CircleDashed} from "lucide-react";
import {transformPriceToEuro} from "@/services/lib/utils";


const PdfTemplate = ({ devis, formatData }) => {
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
    } = formatData;

    const paid = paidAt ? "checked" : "";

    return (
        <div
            id={"pdf-content" + devis.id}
            className="pdf flex flex-col items-between justify-start p-4 w-full bg-white text-text-100 text-sm"
            style={{ width: "210mm", pageBreakInside: "avoid" }}
        >
            {/*TODO: gérer l'overflow -> pagination*/}
            {/*TODO: désactiver daisy Ui*/}
            <section id={"top section"} className={"flex items-start justify-between w-full mb-0 p-4 pb-0"} style={{ pageBreakInside: "avoid" }}>
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
                    <div className="flex flex-wrap items-center text-text-100">
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

            <section id={"devis-details"} className={"flex flex-wrap items-start justify-between w-full mb-1 p-4 gap-2"} style={{ pageBreakInside: "avoid" }}>
                <div id={"devis-infos"} className={"bordered rounded bg-primary p-2 flex flex-col items-between justify-start gap-1"}>
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

            <section id={"tc-section"} className={"p-4 flex flex-col items-start justify-start w-full mb-1"}>
                <h2 className={"underline mb-4"}>Termes et conditions</h2>
                <div className={"bg-primary rounded w-full min-h-32 p-4"}>{tc}</div>
            </section>

            <section id="prestations-section" className="border flex flex-col flex-wrap flex-row justify-center m-4">
                <div className="grid grid-cols-7 items-end justify-items-center border-b bg-primary w-full">
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
                        <div key={prestation.id} style={{ pageBreakInside: "avoid" }} className={"w-full p-2 grid grid-cols-7 gap-x-2 items-center justify-items-center border-none"}
                        >
                            <p className="font-normal">{prestation.element.nom}</p>
                            <PrestationCard nom={"Quantité:"} valeur={prestation.qty.toString()} />
                            <PrestationCard nom={"Prix Unitaire HT:"} valeur={transformPriceToEuro(prestation.prixHT)} />
                            <PrestationCard nom="Total HT" valeur={transformPriceToEuro(prestation.totalHT ?? 0)} />
                            <PrestationCard nom="Pourcentage de TVA:" valeur={prestation.tvaPercentage + "%"} />
                            <PrestationCard nom="TVA: " valeur={transformPriceToEuro(prestation.tva ?? 0)} />
                            <PrestationCard nom="Total TTC:" valeur={transformPriceToEuro(prestation.totalTTC ?? 0)} classname="font-bold" />
                        </div>
                    )
                })}
            </section>

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

            <section id={"bottom-section"} className={"flex items-start justify-between w-full p-4 text-xs"}>
                <div id={"entreprise-infos-section"} style={{ pageBreakInside: "avoid" }}>
                    <p>Siret: {entreprise.siret}</p>
                    {entreprise.codeApe && <p>Code APE: {entreprise.codeApe}</p>}
                    {entreprise.tvaIntracom && <p>Numéro de TVA intracommunautaire: {entreprise.tvaIntracom}</p>}
                </div>
                <div id={"contact-section"} style={{ pageBreakInside: "avoid" }}>
                    {entreprise.contact && <p className={"capitalize"}>Contact: {entreprise.contact}</p>}
                    {entreprise.web && <p><a href={entreprise.web} target={"blank"} className={"underline"}>{entreprise.web}</a></p>}
                    {entreprise.email && <p><a href={"mailto:" + entreprise.email}>{entreprise.email}</a></p>}
                    {entreprise.telephone1 && <p>Téléphone 1: {entreprise.telephone1}</p>}
                    {entreprise.telephone2 && <p>Téléphone2: {entreprise.telephone2}</p>}
                </div>
            </section>
        </div>
    )
};

function PrestationCard({ nom, valeur, classname }: { nom: string, valeur: string, classname?: string }) {
    return (
        <>
            <p className={"block"}>{valeur}</p>
        </>
    )
}

export default PdfTemplate;