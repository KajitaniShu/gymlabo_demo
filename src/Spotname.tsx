import { useState } from 'react';
import { createStyles, ThemeIcon, Progress, Text, Title, Button, Group, Badge, Paper } from '@mantine/core';
import { IconSwimming, IconArrowRight  } from '@tabler/icons';

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    zIndex: 30,
    overflow: 'visible',
    padding: theme.spacing.xl,
    color: "white",
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
  },

  position: {
    maxWidth: '700px',
    zIndex:100,
    position: 'absolute',
    top: "5%",
    left: "3%",
  },

  title: {
    color: theme.white,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 900,
    fontSize: "6em",
    zIndex:100,
    [theme.fn.smallerThan('sm')]: {
      fontSize: "4em",
    },
  },

  overlay: {
    position: 'absolute',
    height: "10em",
    width: "20em",
    bottom: 0,
    left: 0,
    borderRadius:"10px",
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    zIndex: 20,
  },
  
}));

const scaleY = {
  in: { opacity: 1, transform: 'scaleY(1)' },
  out: { opacity: 0, transform: 'scaleY(0)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity',
};

export function Spotname({spotName, modalHandlers, styles}: any) {
  const { classes } = useStyles();
  
  return (
    <>
      <div className={classes.position}>
        <div 
          className={classes.card} >
          
            <Text style={styles.name} className={classes.title}>
              {spotName}
            </Text>
            <Button style={styles.button}  onClick={()=> modalHandlers.open()} radius="xl" mt="lg" size="md"  variant="white" color="indigo" w={"600"}>
              MORE <IconArrowRight/>
            </Button>
        </div>
      </div>
      </>
  );
}