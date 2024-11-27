export default function Footer() {
    return (
        <FooterContainer>
             <FooterGroup>
                <FooterTitle>Social</FooterTitle>
                <FooterLink href="https://github.com">GitHub</FooterLink>
            </FooterGroup>
        </FooterContainer>
    )
}

export function FooterContainer({ children }) {
    return (
        <>
            <footer className="footer">
                <div className="footer-groups-container">{children}</div>
                
                <p className="footer-groups-container">Copyright © {new Date().getFullYear()} Rafi Kastner.</p>
            </footer>
        </>
    )
}

export function FooterGroup({ children }) {
    return (
        <div className="footer-group">{children}</div>
    )
}

export function FooterTitle({ children }) {
    return (
        <h3>{ children }</h3>
    )
}

export function FooterLink({ href, children }) {
    return <a href={href}>{children}</a>
}