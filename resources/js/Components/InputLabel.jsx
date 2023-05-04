export default function InputLabel({
    value,
    className = "",
    children,
    optional,
    ...props
}) {
    return (
        <label
            {...props}
            className={`block font-medium text-sm text-gray-700 ` + className}
        >
            {value ? value : children}
            {optional ? (
                <i className="text-xs opacity-70">&nbsp;(optional)</i>
            ) : null}
        </label>
    );
}
