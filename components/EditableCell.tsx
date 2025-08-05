import React from 'react';

interface EditableCellProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
}

const EditableCell: React.FC<EditableCellProps> = ({ value, onSave, className, tag: Tag = 'div' }) => {
    const handleBlur = (e: React.FocusEvent) => {
        const target = e.currentTarget as HTMLElement;
        if (target.innerText !== value) {
            onSave(target.innerText);
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const target = e.currentTarget as HTMLElement;
        // Pressing Enter will blur the element, effectively saving it.
        // Allow Shift+Enter for newlines.
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            target.blur();
        }
    };

    return (
        <Tag
            contentEditable
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`cursor-text focus:outline-none focus:bg-amber-100/50 print:bg-transparent transition-colors duration-200 ${className || ''}`}
        >
            {value}
        </Tag>
    );
};

export default EditableCell;