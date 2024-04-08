function Footer({ items }) {
  let itemCount = items.length;
  let itemCheckCount = items.filter((item) => item.isChecked).length;
  let percentage = Math.round((itemCheckCount / itemCount) * 100);
  return (
    <div className="Footer">
      <p>
        You have {itemCount} in your list, and you already checked{" "}
        {itemCheckCount} items. {percentage}%.
      </p>
    </div>
  );
}

export default Footer;
