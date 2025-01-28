import React, {useEffect, useRef} from 'react';
import {View, Dimensions, Animated, StyleSheet, Easing} from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = WINDOW_WIDTH * 0.33;
const SkeletonCard = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]).start(finished => {
        if (finished) {
          startAnimation();
        }
      });
    };

    startAnimation();

    return () => {
      animatedValue.setValue(0);
    };
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  return (
    <View style={styles.characterCard}>
      <Animated.View style={[styles.skeletonImage, {opacity}]} />
      <Animated.View style={[styles.skeletonText, {opacity}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    gap: 12,
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#333',
  },
  activeSortButton: {
    backgroundColor: '#666',
  },
  sortButtonText: {
    color: 'white',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 4,
  },
  characterCard: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 4,
  },
  characterImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  characterName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  skeletonImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#666',
  },
  skeletonText: {
    width: '80%',
    height: 14,
    marginTop: 8,
    borderRadius: 4,
    backgroundColor: '#666',
  },
});

export default SkeletonCard;