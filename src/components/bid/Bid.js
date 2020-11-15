import React, {useState, useContext} from 'react';
import { GameContext } from 'GameContext';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      background: "white"
    },
  
    
  },
}));

const Bid = () => {
  const [amount, setAmount] = useState(0);
  const {bidAmountValue, walletAmountValue, phaseValue} = useContext(GameContext);
  const [bidAmount, setBidAmount] = bidAmountValue;
  const [walletAmount, setWalletAmount] = walletAmountValue;
  const [phase, setPhase] = phaseValue;

  const updateAmount = (e) => {
    setAmount(e.target.value);
  }

  const bid = e => {
    e.preventDefault();
    if (amount>walletAmount || amount<10 ) return; 
    setBidAmount(bidAmount + Number(amount));
    setWalletAmount(walletAmount - Number(amount));
    setPhase(phase===1 ? 2 : phase);
  };

  const classes = useStyles();

  return (
    <div>
      <form className={classes.root} onSubmit={bid}>
        <Input 
          className={classes.formControl} 
          type="number" 
          error={amount>walletAmount || amount<10}
          name="amount" 
          value={amount}
          onChange={updateAmount}
        />
        <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
          <Button type="submit" disabled = { phase > 3 } >Bid</Button>
        </ButtonGroup> 
      </form>
      Pot: {bidAmount} €
      Wallet: {walletAmount} €

    </div>
   
  )
}

export default Bid;