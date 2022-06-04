import { Text, TextProps } from '@ui-kitten/components';

export type NunitoTextProps = TextProps & {
  weight?: 'regular' | 'medium' | 'bold' | 'extraBold';
};

export const NunitoText = (props: NunitoTextProps) => {
  const getFontFamily = (weight: NunitoTextProps['weight']) => {
    switch (weight) {
      case 'regular':
        return 'Nunito-Regular';
      case 'medium':
        return 'Nunito-Medium';
      case 'bold':
        return 'Nunito-Bold';
      case 'extraBold':
        return 'Nunito-ExtraBold';
      default:
        return 'Nunito-Regular';
    }
  }

  return <Text {...props} style={[props.style, {
    fontFamily: getFontFamily(props.weight)
  }]} />;
}
