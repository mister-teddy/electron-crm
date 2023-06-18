import usePersistence from "../hooks/usePersistence.js";

const FormItem = nojsx(antd.Form.Item);
const TextArea = nojsx(antd.Input.TextArea);

export default nojsx(({ config, setConfig }) => {
  const [form] = antd.Form.useForm();
  const onFinish = (values) => {
    setConfig(values);
  };

  const [visible, setVisible] = useState(false);
  const onCancel = () => {
    setVisible(false);
  };

  const onOk = () => {
    form.submit();
    setVisible(false);
  };

  return div(
    Avatar.props({
      onClick: () => setVisible(true),
      style: { backgroundColor: "#efefef" },
      size: 64,
    })("⚙"),
    Modal.props({ visible, title: "Setting", onOk, onCancel })(
      Form.props({
        form,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        initialValues: config,
        onFinish,
      })(
        FormItem.props({ name: "name", label: "Name", initialValue: "" })(
          Input()
        ),
        FormItem.props({
          name: "information",
          label: "Information",
          initialValue: "",
        })(TextArea()),
        FormItem.props({
          name: "prefix",
          label: "ID Prefix",
          initialValue: "",
        })(Input())
      )
    )
  );
});
