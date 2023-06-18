const pre = {
  whiteSpace: "pre-wrap",
};

const lightBackground = {
  backgroundColor: "#dedede",
  fontWeight: "bold",
  padding: "8px 0px",
  marginTop: 8,
  "-webkit-print-color-adjust": "exact",
};

const light = {
  color: "#888",
  fontWeight: "normal",
};

export default nojsx(({ invoice, config }) => {
  const { title, description, customer, createdDate, range, hours, rate } =
    invoice;
  const vi = customer.lang === "vi";
  const moneyFormat = (money) =>
    vi
      ? `${String(money).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`
      : `$${money.toFixed(1)}`;

  const createdMoment = moment(createdDate);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      document.title = title;
      document.getElementById("app").style.display = "none";
    } else {
      document.getElementById("app").style.display = "block";
    }
  }, [visible]);

  return div(
    Button.props({ onClick: () => setVisible(true) })("Export"),
    Drawer.class("printable").props({
      title: Row(
        Col.style({ fontSize: 14 }).props({ span: 12 })(
          b(config.name),
          div.style({ ...pre, ...light })(config.information)
        ),
        Col.props({ span: 12, align: "right" }).style({ paddingTop: 12 })(
          span.style({ fontSize: 60, fontWeight: 300 })("INVOICE"),
          div.style({ fontSize: 24, color: "#AAA" })(
            "#" + (config.prefix ?? "") + createdMoment.format("DDMMYYYY")
          )
        )
      ),
      visible,
      onClick: window.print,
      width: "100vw",
      closable: false,
      onClose: () => setVisible(false),
    })(
      Row(
        Col.props({ span: 12 })(
          div(vi ? "Khách hàng" : "Bill To:"),
          b(customer.name),
          div.style(pre)(customer.description)
        ),
        Col.props({ span: 4, align: "right" })(
          div.style(light)(vi ? "Ngày" : "Date:"),
          div.style(lightBackground)(vi ? "Tổng cộng" : "Balance Due:")
        ),
        Col.props({ span: 8, align: "right" })(
          div(
            span.style({ paddingRight: 8 })(
              vi
                ? moment(createdDate).format("DD/MM/YYYY")
                : moment(createdDate).format("MMM DD, YYYY")
            )
          ),
          div.style(lightBackground)(
            span.style({ paddingRight: 8 })(moneyFormat(rate * hours))
          )
        )
      ),
      Table.props({
        columns: [
          {
            title: vi ? "Nội dung" : "Item",
            key: "item",
            render: (_) =>
              p(
                vi
                  ? null
                  : b(
                      range
                        .map((date) => moment(date).format("MMMM Do (dddd)"))
                        .join(" - ") + ":"
                    ),
                div.style(pre)(description)
              ),
          },
          { title: vi ? "Giờ" : "Hours", dataIndex: "hours" },
          {
            title: vi ? "Đơn giá" : "Rate",
            dataIndex: "rate",
            render: moneyFormat,
            align: "right",
          },
          {
            title: vi ? "Thành tiền" : "Amount",
            render: (item) => moneyFormat(item.hours * item.rate),
            align: "right",
          },
        ],
        dataSource: [invoice],
        pagination: false,
      }).style({
        margin: "64px 0",
      })(),
      Row(
        Col.props({ span: 4, offset: 16 }).style(light)(
          vi ? "Tổng cộng" : "Total: "
        ),
        Col.props({ span: 4, align: "right" }).style({ paddingRight: 8 })(
          moneyFormat(hours * rate)
        )
      )
    )
  );
});
