export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-500 text-black shadow-sm focus:ring-black " +
                className
            }
        />
    );
}
