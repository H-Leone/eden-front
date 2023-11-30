"use client";

import { Search } from "lucide-react";
import { StyledFilterInput } from "./filter-input.style";
import { ChangeEventHandler, useCallback } from "react";

interface Props {
    value: string;
    setValue: Function;
    width?: number;
}

function FilterInput({ value, setValue, width }: Props) {
    const handleInputFilter: ChangeEventHandler = useCallback((e) => {
        setValue((e.target as HTMLInputElement).value);
    }, [setValue]);

    return (
        <StyledFilterInput width={width}>
            <input type="text" placeholder="Busque aqui..." onChange={handleInputFilter} value={value} />
            <span>
                <Search size={20} />
            </span>
        </StyledFilterInput>
    );
}

export default FilterInput;