import React from "react";

export const handleNumeric = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    input = input.replace(/[^0-9]/g, "");
    input = input.replace(/^0+(?!$)/, "");

    const numericValue = parseInt(input, 10);

    if (isNaN(numericValue) || numericValue < 0) {
        return 0;
    }

    return numericValue;
};
