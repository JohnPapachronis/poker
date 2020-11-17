import React, { useState } from 'react';
import { bidChange } from 'redux/game/GameActions'
import {connect} from 'react-redux'
import ButtonGroup from '@material-ui/core/ButtonGroup';
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

const Bid = ({
  phase,
  walletAmount,
  bidAmount,
  bidChange
}) => {
  
  const [amount, setAmount] = useState(0);

  const updateAmount = (e) => {
    setAmount(e.target.value);
  }

  const bid = e => {
    e.preventDefault();
    bidChange(Number(amount));
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

const mapStateToProps = (state) => {
  return {
    phase: state.phase,
    walletAmount: state.walletAmount,
    bidAmount: state.bidAmount,
    
  }
}

const mapDispatchToProps = (dispatch) => {
 
  return{
    bidChange: (amount) => dispatch(bidChange(amount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bid);