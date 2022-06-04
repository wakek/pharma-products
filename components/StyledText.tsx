import { Text, TextProps } from '@ui-kitten/components';

export type NunitoTextProps = TextProps & {
  weight?: 'regular' | 'medium' | 'bold' | 'extraBold';
};

export const NunitoText = (props: NunitoTextProps) => {
  const getFontFamily = (weight: NunitoTextProps['weight']) => {
    switch (weight) {
      case 'regular':
        return 'NunitoSans-Regular';
      case 'medium':
        return 'NunitoSans-Medium';
      case 'bold':
        return 'NunitoSans-Bold';
      case 'extraBold':
        return 'NunitoSans-ExtraBold';
      default:
        return 'NunitoSans-Regular';
    }
  }

  return <Text {...props} style={[props.style, {
    fontFamily: getFontFamily(props.weight)
  }]} />;
}
