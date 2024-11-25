export function Item({ Num }) {
    return (
        <Card className="card">
            <CardHeader>
                <CardTitle>Card {Num}</CardTitle>
            </CardHeader>
        </Card>
    )
}

export function Card({ children }) {
    return <div>{ children }</div>
}

export function CardHeader({ children }) {
    return <div>{ children }</div>
}

export function CardTitle({ children }) {
    return <h1>{ children }</h1>
}

export function CardContent({ children }) {
    return <div>{ children }</div>
}