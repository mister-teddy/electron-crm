const FormItem = nojsx(antd.Form.Item)
const Option = value => nojsx(antd.Select.Option).props({ value })(value)
const TextArea = nojsx(antd.Input.TextArea)

export default nojsx(props => {
    const [form] = antd.Form.useForm();
    const onFinish = values => {
        props.push({
            ...values,
            createdDate: moment(),
            title: `Invoice #${moment().format('DDMMYYYY')}`
        })
    }

    return Form.props({
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
        ),
        FormItem.props({ wrapperCol: { offset: 4, span: 20 }, label: '' })(
            Button.props({ type: 'primary', htmlType: 'submit' })('Submit')
        )
    )
})