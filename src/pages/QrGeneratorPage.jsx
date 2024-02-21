import { Link } from "react-router-dom";
import "../styles/QrGeneratorPage.scss";
import QRCode from "qrcode";
import { useState } from "react";

const QrGeneratorPage = () => {
  const [url, setUrl] = useState("");
  const [qrcode, setQrcode] = useState("");

  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
      },
      (err, url) => {
        if (err) return console.error(err);
        console.log(url);
        setQrcode(url);
      }
    );
  };

  return (
    <div className="qr-container">
      <Link to="/">Back</Link>
      <p>QR KODE GENERATOR PAGE</p>
      <input
        type="text"
        placeholder="Enter number of QR codes"
        value={url}
        onChange={(evt) => setUrl(evt.target.value)}
      />
      <button onClick={GenerateQRCode}>Generate</button>
      {qrcode && (
        <>
          <img src={qrcode} alt="" />
          <a href={qrcode} download="qrcode.png">
            Download
          </a>
        </>
      )}
    </div>
  );
};

export default QrGeneratorPage;
