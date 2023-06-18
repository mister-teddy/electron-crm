const FormItem = nojsx(antd.Form.Item);
const TextArea = nojsx(antd.Input.TextArea);

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default nojsx((props) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  const [form] = antd.Form.useForm();
  const onFinish = ({ name, description, lang }) => {
    props.push({
      name,
      description,
      lang,
      avatar: imageUrl,
      createdDate: moment(),
    });
  };

  const [visible, setVisible] = useState(false);
  const onCancel = () => {
    setVisible(false);
  };

  const onOk = () => {
    form.submit().then(onCancel);
  };

  return div(
    Avatar.props({
      onClick: () => setVisible(true),
      style: { backgroundColor: "#1890ff" },
      size: 64,
    })("+"),
    Modal.props({ visible, title: "Create new customer", onOk, onCancel })(
      Form.props({
        form,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        onFinish,
      })(
        FormItem.props({
          name: "name",
          label: "Customer Name",
          rules: [{ required: true }],
        })(Input()),
        FormItem.props({
          name: "description",
          label: "Description",
          initialValue: "",
        })(TextArea()),
        FormItem.props({
          name: "lang",
          label: "Language",
          rules: [{ required: true }],
        })(
          Select.props({
            options: [
              {
                value: "vi",
                label: "Tiếng Việt",
              },
              {
                value: "en",
                label: "English",
              },
            ],
          })()
        ),
        FormItem.props({
          name: "avatar",
          label: "Avatar",
          initialValue: "",
        })(
          Upload.props({
            name: "avatar",
            listType: "picture-card",
            className: "avatar-uploader",
            showUploadList: false,
            beforeUpload: beforeUpload,
            onChange: handleChange,
          })(
            imageUrl
              ? img.props({
                  src: imageUrl,
                  alt: "avatar",
                  style: { width: "100%" },
                })()
              : loading
              ? "Loading"
              : "Upload"
          )
        )
      )
    )
  );
});
