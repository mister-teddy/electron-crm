import usePersistence from "../hooks/usePersistence.js";
import CreateInvoice from "./CreateInvoice.js";
import CreateCustomer from "./CreateCustomer.js";
import Customer from "./Customer.js";
import ExportPdf from "./ExportPdf.js";
import Setting from "./Setting.js";

const App = (props) => {
  const [customers, setCustomers] = usePersistence([], "customers");
  const pushCustomer = (customer) => setCustomers(customers.concat(customer));
  const deleteCustomer = (customer) =>
    setCustomers(customers.filter((c) => c !== customer));
  const [invoices, setInvoices] = usePersistence([], "invoices");
  const pushInvoice = (invoice) => setInvoices([invoice].concat(invoices));
  const deleteInvoice = (invoice) =>
    setInvoices(invoices.filter((i) => i !== invoice));
  const [currentCustomer, setCurrentCustomer] = useState(customers[0]);
  const [config, setConfig] = usePersistence({}, "config");

  useEffect(() => {
    if (customers.length) {
      setCurrentCustomer(customers[0]);
    }
  }, [customers]);

  return Row.props({ gutter: [16, 16], style: { padding: 16 } })(
    Col.props({ span: 24, align: "center" })(
      Space(
        customers.map((customer, i) =>
          Customer.key(i).props({
            customer,
            deleteCustomer,
            setCurrentCustomer,
          })()
        ),
        CreateCustomer.props({ push: pushCustomer })(),
        Setting.props({ config, setConfig })()
      )
    ),
    currentCustomer &&
      Col.props({ span: 24, align: "center" })(
        Table.props({
          columns: [
            {
              title: "Title",
              dataIndex: "title",
              sorter: (a, b) => (a.createdDate > b.createdDate ? 1 : -1),
              defaultSortOrder: "descend",
            },
            {
              title: "Hours",
              dataIndex: "hours",
              sorter: (a, b) => (a.hours > b.hours ? 1 : -1),
            },
            {
              title: "Rate",
              dataIndex: "rate",
              sorter: (a, b) => (a.rate > b.rate ? 1 : -1),
            },
            {
              title: "Delete",
              key: "delete",
              render: (item) =>
                Popconfirm.props({
                  title: "Are you sure to delete this invoice?",
                  onConfirm: () => deleteInvoice(item),
                })(Button.props({ type: "link", danger: true })("Delete")),
              align: "center",
            },
            {
              title: "Export",
              key: "export",
              render: (item) => ExportPdf.props({ invoice: item, config })(),
              fixed: "right",
              align: "center",
            },
          ],
          dataSource: invoices.filter(
            (i) => i.customer.name === currentCustomer.name
          ),
        })(),
        CreateInvoice.props({
          pushInvoice,
          customer: currentCustomer,
          config,
        })()
      )
  );
};

export default nojsx(App);
