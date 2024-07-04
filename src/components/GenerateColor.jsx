import React, { useEffect, useState } from 'react';

const GenerateColor = () => {
    const [color, setColor] = useState(() => {
        const data = JSON.parse(localStorage.getItem('colors'));
        return data || [];
    });

    // Function to handle generating new color
    const handleColor = () => {
        const pick = "0123456789ABCDEF";
        let nCol = "";
        for (let i = 0; i < 6; i++) {
            nCol += pick[Math.floor(Math.random() * 16)];
        }
        setColor([...color, nCol]);
    };

    // Function to handle removing color by index
    const removeColor = (index) => {
        const updatedColors = [...color];
        updatedColors.splice(index, 1);
        setColor(updatedColors);
    };

    // Effect to update localStorage whenever 'color' changes
    useEffect(() => {
        localStorage.setItem('colors', JSON.stringify(color));
    }, [color]);

    // Effect to load colors from localStorage on initial render
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('colors'));
        if (data) {
            setColor(data);
        }
    }, []);

    return (
        <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>GenerateColor</h1>
            <button style={{ marginBottom: '20px', padding: '8px 15px', fontSize: '14px', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }} onClick={handleColor}>Generate Color</button>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {color.map((item, index) => (
                    <div key={index} style={{ position: 'relative', height: '100px', width: '150px', borderRadius: '10px', backgroundColor: `#${item}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '12px', position: 'absolute', bottom: '-20px', left: '50%',color: "black", transform: 'translateX(-50%)' }}>{item}</div>
                        <button onClick={() => removeColor(index)} style={{ position: 'absolute', top: '10px', right: '10px', padding: '4px 8px', fontSize: '12px', backgroundColor: '#DC3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenerateColor;
