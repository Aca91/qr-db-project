import { Link } from "react-router-dom";
import "../styles/QrGeneratorPage.scss";
import QRCode from "qrcode";
import { useState } from "react";

const QrGeneratorPage = () => {
  const [numberOfCodes, setNUmberOfCode] = useState(1);
  const [qrcode, setQrcode] = useState([]);

  const GenerateQRCode = () => {
    const codes = [];

    for (let i = 0; i < numberOfCodes; i++) {
      QRCode.toDataURL(
        `${i}`,
        {
          width: 400,
          margin: 2,
        },
        (err, dataURL) => {
          if (err) return console.log(err);
          codes.push(dataURL);
          if (codes.length === numberOfCodes) {
            setQrcode(codes);
          }
        }
      );
    }
  };
  const handleDownloadAll = () => {
    const spacing = 10;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const qrCodeHeight = 400;
    const totalHeight =
      numberOfCodes * qrCodeHeight + (numberOfCodes - 1) * spacing;

    canvas.width = 400;
    canvas.height = totalHeight;

    let imagesLoaded = 0;

    qrcode.forEach((qrcode, index) => {
      const img = new Image();
      img.src = qrcode;
      img.onload = () => {
        const yPosition = index * (qrCodeHeight + spacing);
        context.drawImage(img, 0, yPosition);

        imagesLoaded++;

        if (imagesLoaded === numberOfCodes) {
          const downloadLink = document.createElement("a");
          downloadLink.href = canvas.toDataURL("image/png");
          downloadLink.download = "all_qrcodes.png";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      };
      img.onerror = (err) => {
        console.error("Error loading image:", err);
        imagesLoaded++;
      };
    });
  };

  return (
    <div className="qr-container">
      <Link to="/">Back</Link>
      <p>QR KODE GENERATOR PAGE</p>
      <input
        type="number"
        placeholder="Enter number of QR codes"
        value={numberOfCodes}
        onChange={(evt) => setNUmberOfCode(Number(evt.target.value))}
      />
      <button onClick={GenerateQRCode}>Generate</button>
      {qrcode.length > 0 && (
        <>
          {qrcode.map((qrcode, index) => (
            <div key={index}>
              <img src={qrcode} alt={`QR Code ${index + 1}`} />
            </div>
          ))}
          <button onClick={handleDownloadAll}>Download All QR Codes</button>
        </>
      )}
    </div>
  );
};

export default QrGeneratorPage;
