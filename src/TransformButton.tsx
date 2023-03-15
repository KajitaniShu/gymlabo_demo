import { createStyles, SegmentedControl, Group, Center } from '@mantine/core';
import { IconArrowsMove, IconArrowAutofitWidth, IconRefresh, IconEye } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  active: {
    backgroundColor: theme.colors.gray[7]
  },

  control: {
    border: '0 !important',
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));

export function TransformButton({setMode}: any) {
  const { classes } = useStyles();
  
  return (
    <Group>
      <SegmentedControl
        onChange={(e) => setMode(e)}
        orientation="vertical"
        mx="md"
        my="md"
        radius="md"
        size="md"
        data={[
          { value: 'none',      label: (<IconEye size={16} />)},
          { value: 'translate', label: (<IconArrowsMove size={16} />)},
          { value: 'rotate',    label: (<IconRefresh size={16} />)},
          { value: 'scale',     label: (<IconArrowAutofitWidth size={16} />)},
        ]}
        classNames={classes}
      />
    </Group>
  );
}