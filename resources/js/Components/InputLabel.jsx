export default function InputLabel({
    value,
    className = "",
    children,
    optional,
    text = "text-sm",
    ...props
}) {
    return (
        <label
            {...props}
            className={`block font-medium ${text} text-gray-700 ` + className}
        >
            {value ? value : children}
            {optional ? (
                <i className="text-xs opacity-70">&nbsp;(optional)</i>
            ) : null}
        </label>
    );
}
