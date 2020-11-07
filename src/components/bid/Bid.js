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
  const {bidAmountValue} = useContext(GameContext);
  const [bidAmount, setBidAmount] = bidAmountValue;
  const {walletAmountValue} = useContext(GameContext);
  const [walletAmount, setWalletAmount] = walletAmountValue;

  const updateAmount = (e) => {
    setAmount(e.target.value);
  }

  const bid = e => {
    e.preventDefault();
    if (Number(amount)>walletAmount) return; 
    setBidAmount(bidAmount + Number(amount));
    setWalletAmount(walletAmount - Number(amount));
  };

  const classes = useStyles();

  return (
    <div>
      <form className={classes.root} onSubmit={bid}>
        <Input 
          className={classes.formControl} 
          type="number" 
          error={amount>walletAmount}
          name="amount" 
          value={amount} 
          onChange={updateAmount}
        />
        <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
          <Button type="submit">Bid</Button>
        </ButtonGroup> 
      </form>
      Pot: {bidAmount} €
      Wallet: {walletAmount} €

    </div>
   
  )
}

export default Bid;