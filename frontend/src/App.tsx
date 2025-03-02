import React from "react";

import { PartForm } from "./components/PartForm";
import {PartsList} from "./components/PartList.tsx";

const App: React.FC = () => {
    return (
        <div>
            <h1>Car Parts Shop</h1>
            <PartForm onPartAdded={() => window.location.reload()} />
            <PartsList />
        </div>
    );
};

export default App;
