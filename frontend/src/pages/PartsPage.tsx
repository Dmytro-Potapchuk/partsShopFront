import React, { useState } from "react";
import PartList from "../components/PartList";
import PartForm from "../components/PartForm.tsx";
import { Part } from "../services/partsService";

const PartsPage: React.FC = () => {
    const [selectedPart, setSelectedPart] = useState<Part | null>(null);

    return (
        <div>
            <h1>Car Parts</h1>
            <PartForm selectedPart={selectedPart} onRefresh={() => window.location.reload()} onClear={() => setSelectedPart(null)} />
            <PartList onEdit={(part) => setSelectedPart(part)} />
        </div>
    );
};

export default PartsPage;
