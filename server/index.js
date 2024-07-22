import express from "express"
const app = express();
import cors from "cors"
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x543a9364540109387d55bf70dd6ae91f4304d23c": 100,   // add 0x front
  "0x9399c42ffb1635937435b7ce03a71877fd0c9ad9": 50,
  "0xa138f169899ab3e395a5a73a497fdeac7e35ccb3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  // Todo :  get a signature from client application 
  // convert it into public  address
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;

  }
}
