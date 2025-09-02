"use client";
import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
    return (
        <div className="flex items-center justify-center">
            <FaSpinner className="animate-spin text-blue-500 text-3xl" />
        </div>
    );
}