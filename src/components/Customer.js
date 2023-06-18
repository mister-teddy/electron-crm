export default nojsx(({ customer, deleteCustomer, setCurrentCustomer }) => {
  const { name, avatar } = customer;
  return Popover.props({
    content: Result.props({
      status: "success",
      title: name,
      extra: Popconfirm.props({
        title:
          "Are you sure you want to delete this customer? This action cannot be undo!",
        onConfirm: () => deleteCustomer(customer),
      })(Button.props({ type: "link", danger: true })("Delete customer")),
    })(),
  })(
    Avatar.props({
      src: avatar,
      size: 64,
      onClick: () => setCurrentCustomer(customer),
    })()
  );
});
