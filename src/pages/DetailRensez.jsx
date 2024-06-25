import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FetchRend from "../Fetching/FetchRend";

function DetailRensez() {
    const [step, setStep] = useState(1);
    const { NOM } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const data = await FetchRend.getONERendezVous(NOM);
                setData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchdata();
    }, [NOM]);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    return (
        <>
            {data ? (
                <div className="container mt-4 px-5">
                    <div className="flex justify-between mt-5">
                        <h2 className="mb-4 text-2xl font-bold">Access Combles Form</h2>
                        <span>
                            <Link to={"/Rendez-vous"} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                                Back
                            </Link>
                        </span>
                    </div>
                    {step === 1 && (
                        <div className="border shadow-lg p-5 grid grid-cols-2 gap-4 mt-5">
                            <div>
                                <p className="mb-3">
                                    <strong>Nom:</strong> {data.NOM}
                                </p>
                                <p className="mb-3">
                                    <strong>Address:</strong> {data.ADRESSE}
                                </p>
                                <p className="mb-3">
                                    <strong>Email:</strong> {data.MAIL}
                                </p>
                                <p className="mb-3">
                                    <strong>Telephone:</strong> {data.TELEPHONE}
                                </p>
                                <p className="mb-3">
                                    <strong>Comments:</strong> {data.COMMENTAIRE}
                                </p>
                            </div>
                        </div>
                        
                    )}
                    {step === 2 && (
                        <div className="border shadow-lg p-5 mt-5 grid grid-cols-2 gap-4">
                            <div>
                                <p className="mb-3">
                                    <strong>Habitable Surface:</strong> {data.SURFACE_HABITABLE || 'N/A'}
                                </p>
                                <p className="mb-3">
                                    <strong>Fiscal Revenue:</strong> {data.REVENUE_FISCAL || 'N/A'}
                                </p>
                                <p className="mb-3">
                                    <strong>Travaux a Prevoir:</strong> {data.TRAVAUX_A_PREVOIR}
                                </p>
                                <p className="mb-3">
                                    <strong>Precarite:</strong> {data.PRECARITE}
                                </p>
                                <p className="mb-3">
                                    <strong>Nombre habitants déclaré fiscalement:</strong> {data.NOMBRE_HABITANTS_DECLARE_FISCALEMENT}
                                </p>
                            </div>
                            <div>
                                <p className="mb-3">
                                    <strong>Avis Fiscal:</strong> {data.AVIS_FISCAL}
                                </p>
                                <p className="mb-3">
                                    <strong>Reference Fiscal:</strong> {data.REF_FISCAL}
                                </p>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="border shadow-lg p-5 mt-5 grid grid-cols-3 gap-4">
                            <div>
                                <p className="mb-3">
                                    <strong>Mode de chauffage:</strong> {data.MODE_DE_CHAUFFAGE}
                                </p>
                                <p className="mb-3">
                                    <strong>Type de Chaudiere:</strong> {data.TYPE_DE_CHAUDIERE}
                                </p>
                                <p className="mb-3">
                                    <strong>Année de Chaudiere:</strong> {data.ANNEE_CHAUDIERE || 'N/A'}
                                </p>
                                <p className="mb-3">
                                    <strong>Année de construction:</strong> {data.ANNEE_CONSTRUCTION || 'N/A'}
                                </p>
                                <p className="mb-3">
                                    <strong>Owner Since:</strong> {data.PROPRIETAIRE_DEPUIS || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="mb-3">
                                    <strong>Isolated A1e:</strong> {data.ISO_A_1e}
                                </p>
                                <p className="mb-3">
                                    <strong>OK pour enlever l'ancienne ISO:</strong> {data.OK_POUR_ENLEVER_ANCIENNE_ISO}
                                </p>
                                <p className="mb-3">
                                    <strong>Superficie Combles:</strong> {data.SUPERFICIE_COMBLES || 'N/A'}
                                </p>
                                <p className="mb-3">
                                    <strong>Accès aux combles:</strong> {data.ACCES_COMBLES || 'N/A'}
                                </p>
                                <p className="mb-3">
                                    <strong>DPE Effectuer:</strong> {data.DPE_EFFECTUER ? 'Yes' : 'No'}
                                </p>
                            </div>
                            <div>
                                <p className="mb-3">
                                    <strong>Code Securite Transmettre Client:</strong> {data.CODE_SECURITE_TRANSMETTRE_CLIENT}
                                </p>
                                <p className="mb-3">
                                    <strong>Type de Vitrage:</strong> {data.TYPE_VITRAGE}
                                </p>
                                <p className="mb-3">
                                    <strong>Sous Sol:</strong> {data.SOUS_SOL ? 'Yes' : 'No'}
                                </p>
                                <p className="mb-3">
                                    <strong>Vide Sanitaire:</strong> {data.VIDE_SANITAIRE ? 'Yes' : 'No'}
                                </p>
                                <p className="mb-3">
                                    <strong>Cave:</strong> {data.CAVE ? 'Yes' : 'No'}
                                </p>
                                <p className="mb-3">
                                    <strong>Mitoyen:</strong> {data.MITOYEN ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="mt-4 flex justify-between">
                        {step > 1 && (
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg" onClick={handlePrevious}>
                                Previous
                            </button>
                        )}
                        {step < 3 && (
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleNext}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default DetailRensez;
