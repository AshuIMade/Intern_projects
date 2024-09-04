
function Footer(){
    const fb="./src/assets/fb.png"
  const x="./src/assets/x.png"
  const linkk="./src/assets/link.png"
return(
    <>
    <footer className="footer">
        
            <p>{new Date().getFullYear()}&copy; Derash</p>
            <div className="social">
           <a href="https://www.facebook.com/Derash-Bill-Pay-211384676079772" target="blank" className="fb"> <img src={fb}></img></a>
           <a href="https://x.com/DerashBillPay" target="blank" className="fb"><img src={x}></img></a> 
           <a href="https://www.linkedin.com/in/derash-bill-pay-012bb415a/" target="blank" className="fb"><img src={linkk}></img></a> 
            </div>
        </footer>
    
    
    </>
);


}
export default Footer