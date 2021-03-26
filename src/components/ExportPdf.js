const pre = {
    whiteSpace: 'pre-wrap'
}

const lightBackground = {
    backgroundColor: '#dedede',
    fontWeight: 'bold',
    padding: '8px 0px',
    marginTop: 8,
    '-webkit-print-color-adjust': 'exact'
}

const light = {
    color: '#888',
    fontWeight: 'normal'
}

const moneyFormat = money => `$${money.toFixed(1)}`

export default nojsx(({ invoice }) => {
    const { title, description, customer, createdDate, range, hours, rate } = invoice
    const createdMoment = moment(createdDate)

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (visible) {
            document.title = title
            document.getElementById('app').style.display = 'none'
        } else {
            document.getElementById('app').style.display = 'block'
        }
    }, [visible])

    return div(
        Button.props({ onClick: () => setVisible(true) })('Export'),
        Drawer.class('printable').props({
            title:
                Row(
                    Col.style({ fontSize: 14 }).props({ span: 12 })(
                        b('Nguyen Hong Phat'),
                        div.style(light)('Email: hongphat.js@gmail.com'),
                        div.style(light)('Phone: +84589424815'),
                        div.style(light)('Address: 267/31, Square 4, Area A, Hau Nghia Town, Duc Hoa District, Long An Province, Viet Nam')
                    ),
                    Col.props({ span: 12, align: 'right' }).style({ paddingTop: 12 })(
                        span.style({ fontSize: 60, fontWeight: 300 })('INVOICE'),
                        div.style({ fontSize: 24, color: '#AAA' })('#' + createdMoment.format('DDMMYYYY')),
                    )
                ),
            visible, onClick: window.print, width: '100vw', closable: false, onClose: () => setVisible(false)
        })(
            Row(
                Col.props({ span: 12 })(
                    div('Bill To:'),
                    b(customer.name),
                    div.style(pre)(customer.description)
                ),
                Col.props({ span: 4, align: 'right' })(
                    div.style(light)('Date:'),
                    div.style(lightBackground)('Balance Due:')
                ),
                Col.props({ span: 8, align: 'right' })(
                    div(
                        span.style({ paddingRight: 8 })(moment(createdDate).format('MMM DD, YYYY'))
                    ),
                    div.style(lightBackground)(
                        span.style({ paddingRight: 8 })(moneyFormat(rate * hours))
                    )
                ),
            ),
            Table.props({
                columns: [
                    {
                        title: 'Item', key: 'item', render: _ => p(
                            b(range.map(date => moment(date).format('MMMM Do (dddd)')).join(' - ') + ':'),
                            div.style(pre)(description)
                        )
                    },
                    { title: 'Hours', dataIndex: 'hours' },
                    { title: 'Rate', dataIndex: 'rate', render: moneyFormat, align: 'right' },
                    { title: 'Amount', render: item => moneyFormat(item.hours * item.rate), align: 'right' }
                ],
                dataSource: [invoice],
                pagination: false
            }).style({
                margin: '64px 0'
            })(),
            Row(
                Col.props({ span: 4, offset: 16 }).style(light)(
                    'Total: '
                ),
                Col.props({ span: 4, align: 'right' }).style({ paddingRight: 8 })(
                    moneyFormat(hours * rate)
                )
            ),
        )
    )
})