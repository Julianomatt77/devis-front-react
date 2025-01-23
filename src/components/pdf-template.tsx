import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { createTw } from "react-pdf-tailwind";
import {CircleCheckBig, CircleDashed} from "lucide-react";
import {Title} from "@radix-ui/react-dialog";

const tw = createTw({
    theme: {

    },
});

/*
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 16,
    },
    section: {
        marginBottom: 16,
    },
    header: {
        backgroundColor: '#3B82F6', // bg-blue-500
        color: '#FFFFFF',           // text-white
        padding: 16,                // p-4
        fontSize: 24,               // text-3xl
    },
    bodyText: {
        fontSize: 18,               // text-lg
    },
    boldText: {
        fontWeight: 'bold',         // font-bold
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fullWidth: {
        width: '100%',
    },
});
*/

const PdfTemplate = ({ data, formatData }) => {
    const { entreprise, prestations, tc, paidAt } = data;

    const {
        entrepriseNom,
        entrepriseAdresseRue,
        entrepriseAdresseVille,
        clientNom,
        clientPrenom,
        clientAdresseRue,
        clientAdresseVille,
        contactClient,
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
        <Document>
            <Page size="A4" style={tw("flex flex-col justify-start p-4 w-full text-sm")}>
                <View style={tw("flex flex-row justify-between w-full mb-8 p-4")}>
                    <View>
                        <Text>{entrepriseNom}</Text>
                        {entreprise.contact && <Text>{entreprise.contact}</Text>}
                        <Text>{entrepriseAdresseRue}</Text>
                        <Text>{entrepriseAdresseVille}</Text>
                    </View>
                    <View>
                        <Text style={tw("text-4xl font-bold capitalize")}>{data?.reference}</Text>
                        {/*<View style={tw("flex flex-wrap items-center text-base font-semibold text-gray-900")}>*/}
                        {/*    <View style={tw("justify-center")}>*/}
                        {/*        <View style={tw("form-control")}>*/}
                        {/*            <Text style={tw("label")}>*/}
                        {/*                {!paid && <CircleDashed className=""/>}*/}
                        {/*                {paid && <CircleCheckBig className="text-green-500"/>}*/}
                        {/*            </Text>*/}
                        {/*        </View>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                    </View>
                </View>

                <View style={tw("flex flex-row justify-between w-full mb-8 p-4 gap-4")}>
                    <View style={tw("rounded p-4 flex flex-col justify-start gap-2")}>
                        <View style={tw("flex flex-row flex-wrap justify-between items-center gap-x-4")}>
                            <Text>Référence: </Text>
                            <Text>{data?.reference}</Text>
                        </View>
                        <View style={tw("flex flex-row flex-wrap justify-between gap-x-2")}>
                            <Text>Date du devis:  </Text>
                            <Text>{updatedAtDate}</Text>
                        </View>
                        <View style={tw("flex flex-row flex-wrap justify-between gap-x-2")}>
                            <Text>Date de début de la prestation: </Text>
                            <Text>{debutAtDate}</Text>
                        </View>
                        <View style={tw("flex flex-row flex-wrap justify-between gap-x-2")}>
                            <Text>Date de validité: </Text>
                            <Text>{validite}</Text>
                        </View>
                        <View style={tw("flex flex-row flex-wrap justify-between gap-x-2")}>
                            <Text>Contact client:</Text>
                            <Text>{contactClient}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={tw("underline mb-4")}>Destinataire :</Text>
                        <Text style={tw("capitalize")}>{clientNom} {clientPrenom}</Text>
                        <Text>{clientAdresseRue}</Text>
                        <Text>{clientAdresseVille}</Text>
                    </View>
                </View>

                <View style={"p-4 flex flex-col items-start justify-start w-full mb-8"}>
                    <Text style={tw("underline mb-4")}>Termes et conditions</Text>
                    <Text style={tw("rounded w-full min-h-16 p-4")}>{tc}</Text>
                </View>

                <View style={tw("border flex flex-row flex-wrap w-full justify-center gap-2")}>
                    <View style={tw("grid grid-cols-7 border-b p-2 w-full")}>
                        <Text>Description</Text>
                        <Text>Quantité</Text>
                        <Text>Prix unitaire HT</Text>
                        <Text>Total HT</Text>
                        <Text>TVA %</Text>
                        <Text>TVA</Text>
                        <Text>Total TTC</Text>
                    </View>
                    {prestations.map((prestation, index) => (
                        <View key={index} style={tw("grid grid-cols-7 gap-x-2 justify-items-center border-none w-full p-4")}>
                            <Text style={tw("font-bold")}>{prestation.element.nom}</Text>
                            <Text>{prestation.qty}</Text>
                            <Text>{prestation.prixHT}</Text>
                            <Text>{prestation.totalHT}</Text>
                            <Text>{prestation.tvaPercentage}</Text>
                            <Text>{prestation.tva}</Text>
                            <Text>{prestation.totalTTC}</Text>
                        </View>
                    ))}
                </View>

                <View style={tw("flex flex-row justify-between items-center p-4 border-none w-full")}>
                    <Text>{`Total HT: ${prixHtCalcule}`}</Text>
                    <Text>{`TVA: ${tvaCalcule}`}</Text>
                    <Text>{`Total TTC: ${totalTTCCalcule}`}</Text>
                    {paidAtDate && <Text>{`Payé le: ${paidAtDate}`}</Text>}
                </View>
            </Page>
        </Document>
    );
};

export default PdfTemplate;