const Button = ({ children, bgColor, ...props }) => {
  const classes = `${bgColor}  text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 w-full`;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
