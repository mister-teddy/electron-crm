const FormItem = nojsx(antd.Form.Item)
const Option = value => nojsx(antd.Select.Option).props({ value })(value)
const TextArea = nojsx(antd.Input.TextArea)

export default nojsx(({ pushInvoice, customer }) => {
    const [form] = antd.Form.useForm();
    const createdDate = moment()
    const title = `Invoice #${moment().format('DDMMYYYY')}`
    const onFinish = values => {
        pushInvoice({
            ...values,
            customer: customer.name,
            title,
            createdDate
        })
    }

    const [visible, setVisible] = useState(false)
    const onCancel = () => {
        setVisible(false)
    }
    const onOk = () => {
        form.submit();
        onCancel();
    }

    return div(
        Statistic.props({ title: 'Create new invoice', value: title })(),
        Button.props({ type: 'primary', onClick: () => setVisible(true) })('Create'),
        Modal.props({ visible, title: 'Create new invoice for ' + customer.name, onOk, onCancel })(
            Form.props({
                form,
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
                onFinish
            })(
                FormItem.props({ name: 'hours', label: 'Hours', initialValue: 20 })(
                    InputNumber()
                ),
                FormItem.props({ name: 'rate', label: 'Rate', initialValue: 10 })(
                    Select(
                        Option(10),
                        Option(15),
                    )
                ),
                FormItem.props({ name: 'description', label: 'Description ', initialValue: '' })(
                    TextArea()
                )
            )
        )
    )
})