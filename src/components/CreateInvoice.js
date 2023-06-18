const FormItem = nojsx(antd.Form.Item);
const TextArea = nojsx(antd.Input.TextArea);
const RangePicker = nojsx(antd.DatePicker.RangePicker);

export default nojsx(({ pushInvoice, customer, config }) => {
  const [form] = antd.Form.useForm();
  const createdDate = moment();
  const title = `Invoice #${config.prefix ?? ""}${moment().format("DDMMYYYY")}`;
  const onFinish = (values) => {
    const { name, description, lang } = customer;
    pushInvoice({
      ...values,
      customer: { name, description, lang },
      title,
      createdDate,
    });
  };

  const [visible, setVisible] = useState(false);
  const onCancel = () => {
    setVisible(false);
  };
  const onOk = () => {
    form.submit();
    onCancel();
  };

  return div(
    Statistic.props({ title: "Create new invoice", value: title })(),
    Button.props({ type: "primary", onClick: () => setVisible(true) })(
      "Create"
    ),
    Modal.props({
      visible,
      title: "Create new invoice for " + customer.name,
      onOk,
      onCancel,
    })(
      Form.props({
        form,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        onFinish,
      })(
        FormItem.props({ name: "hours", label: "Hours", initialValue: 20 })(
          InputNumber()
        ),
        FormItem.props({ name: "rate", label: "Rate", initialValue: 10 })(
          InputNumber()
        ),
        FormItem.props({
          name: "range",
          label: "Working days",
          initialValue: [moment().subtract(6, "days"), moment()],
        })(RangePicker()),
        FormItem.props({
          name: "description",
          label: "Description ",
          initialValue: "",
        })(TextArea())
      )
    )
  );
});
