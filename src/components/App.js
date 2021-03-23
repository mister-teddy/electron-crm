import CreateInvoice from './CreateInvoice.js'

const App = props => {
    const [invoices, setInvoices] = useState([]);
    const pushInvoice = invoice => setInvoices(invoices.concat(invoice))

    useEffect(() => {
        let savedInvoices = localStorage.getItem('invoices')
        if (savedInvoices) {
            savedInvoices = JSON.parse(savedInvoices)
            setInvoices(savedInvoices)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('invoices', JSON.stringify(invoices))
    }, [invoices])

    return Row.props({ gutter: 16 })(
        Col.props({ span: 24 })(
            Avatar.props({ style: { backgroundColor: '#87d068' }, size: 64 })('U'),
            Avatar.props({ style: { backgroundColor: '#1890ff' }, size: 64 })('U')
        ),
        invoices.map(invoice => Col.props({ span: 6 })(
            Card.props({ title: invoice.title, actions: [Button('Download')] })(
                invoice.description
            )
        )),
        Col.props({ span: 24 })(
            CreateInvoice.props({ push: pushInvoice })(),
        )
    )
}

export default nojsx(App)