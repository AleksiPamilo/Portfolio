interface MaskedIconProps {
    src: string
    alt?: string
    className?: string
}

export function MaskedIcon({ src, alt, className = "" }: MaskedIconProps) {
    return (
        <div
            role={alt ? "img" : undefined}
            aria-label={alt}
            className={`bg-green-400 ${className}`}
            style={{
                WebkitMask: `url(${src}) no-repeat center / contain`,
                mask: `url(${src}) no-repeat center / contain`,
            }}
        />
    )
}