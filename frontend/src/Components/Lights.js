import React from 'react';

const Lights = ({lights}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                   <th>ID</th>
                   <th>Estado</th>
                   <th>Nombre</th>
                   <th>Area</th>
                </tr>
            </thead>
            <tbody>
                {lights.map(light => (
                    <tr key={light.id}>
                        <th>{light.id}</th>
                        <th>{light.state}</th>
                        <th>{light.name}</th>
                        <th>{light.area}</th>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Lights;