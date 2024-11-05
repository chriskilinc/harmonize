import { useState } from 'react';
import "./CopyButton.css";

interface CopyButtonProps {
    text: string;
    size: string;
}

export const CopyButton = ({ text, size }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
    };

    // change copied to false after 2 seconds
    if (copied) {
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <button className={`copy-button`} data-copied={copied} onClick={copyToClipboard}>
            {copied ?

                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}><path d="M11 1.5h2.5v12a1 1 0 01-1 1h-10a1 1 0 01-1-1v-12H4m1 7l2 2 3.5-4m-6-6h6v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" stroke="currentColor"></path></svg>
                :
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}><path d="M10.5.5l.277-.416L10.651 0H10.5v.5zm3 2h.5v-.268l-.223-.148-.277.416zm-1 9.5h-8v1h8v-1zM4 11.5v-10H3v10h1zM4.5 1h6V0h-6v1zM13 2.5v9h1v-9h-1zM10.223.916l3 2 .554-.832-3-2-.554.832zM4.5 12a.5.5 0 01-.5-.5H3A1.5 1.5 0 004.5 13v-1zm8 1a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zM4 1.5a.5.5 0 01.5-.5V0A1.5 1.5 0 003 1.5h1zm-3 2v10h1v-10H1zM2.5 15h8v-1h-8v1zm0-12h1V2h-1v1zM12 13.5v-1h-1v1h1zM10.5 15a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zM1 13.5A1.5 1.5 0 002.5 15v-1a.5.5 0 01-.5-.5H1zm1-10a.5.5 0 01.5-.5V2A1.5 1.5 0 001 3.5h1z" fill="currentColor"></path></svg>
                // <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}><path d="M11 1.5h2.5v12a1 1 0 01-1 1h-10a1 1 0 01-1-1v-12H4M7.5 6v5M5 8.5h5M4.5.5h6v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" stroke="currentColor"></path></svg>
            }

            {/* <span className='copy-text'>{copied ? "copied!" : "copy"}</span> */}
        </button>
    );
}