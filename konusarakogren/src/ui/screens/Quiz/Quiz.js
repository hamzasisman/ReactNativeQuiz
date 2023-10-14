import React, { useEffect, useState } from 'react';
import {
  PixelRatio,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../../theme/Colors';
import TopMenu from '../../components/TopMenu';
import routes from '../../../navigation/routes';
import { useLocalization } from '../../../hooks/useLocalization';
import { units } from '../../../theme/Units';
import Fonts from '../../../theme/Fonts';
import { BookPreview, Play } from '../../../assets/svgs';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import BookPreviewButton from './BookPreviewButton';

const books = [
  { id: 1, quizId: "c4fa0441-aa17-4c63-b0ba-59f7921a7e53", bookName: "Beginner / Level 2 / Unit 1", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 2, quizId: "0db486d5-d534-4262-9099-0a00dd997249", bookName: "Beginner / Level 2 / Unit 2", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 3, quizId: "f2eb5f75-6d2e-441a-ae55-52128b05b5f6", bookName: "Beginner / Level 2 / Unit 3", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 4, quizId: "f1d285c5-ad25-42ef-9a28-474985f21142", bookName: "Beginner / Level 2 / Unit 4", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 5, quizId: "e0598ecb-6b54-4666-94f8-f42a8c2dbd89", bookName: "Beginner / Level 2 / Unit 5", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 6, quizId: "4cf8d712-3a7b-430a-bbc3-f4703b17e79a", bookName: "Beginner / Level 2 / Unit 6", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 7, quizId: "7d0e7d0e-7d0e-7d0e-7d0e-7d0e7d0e7d0e", bookName: "Beginner / Level 2 / Unit 7", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 8, quizId: "8d0e8d0e-8d0e-8d0e-8d0e-8d0e8d0e8d0e", bookName: "Beginner / Level 2 / Unit 8", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 9, quizId: "9d0e9d0e-9d0e-9d0e-9d0e-9d0e9d0e9d0e", bookName: "Beginner / Level 2 / Unit 9", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 10, quizId: "ad10e10e-ad10-10e1-10e1-ad10e10e10e1", bookName: "Beginner / Level 2 / Unit 10", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 11, quizId: "bd11e11e-bd11-11e1-11e1-bd11e11e11e1", bookName: "Beginner / Level 2 / Unit 11", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 12, quizId: "cd12e12e-cd12-12e1-12e1-cd12e12e12e1", bookName: "Beginner / Level 2 / Unit 12", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 13, quizId: "dd13e13e-dd13-13e1-13e1-dd13e13e13e1", bookName: "Beginner / Level 2 / Unit 13", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 14, quizId: "ed14e14e-ed14-14e1-14e1-ed14e14e14e1", bookName: "Intermediate / Level-4 / Unit-14", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 15, quizId: "fd15e15e-fd15-15e1-15e1-fd15e15e15e1", bookName: "Beginner / Level 2 / Unit 15", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 16, quizId: "1d16e16e-1d16-16e1-16e1-1d16e16e16e1", bookName: "Beginner / Level 2 / Unit 16", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 17, quizId: "2d17e17e-2d17-17e1-17e1-2d17e17e17e1", bookName: "Beginner / Level 2 / Unit 17", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 18, quizId: "3d18e18e-3d18-18e1-18e1-3d18e18e18e1", bookName: "Beginner / Level 2 / Unit 18", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 19, quizId: "4d19e19e-4d19-19e1-19e1-4d19e19e19e1", bookName: "Beginner / Level 2 / Unit 19", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S3/191.jpg", isCompleted: true },
  { id: 20, quizId: "5d20e20e-5d20-20e1-20e1-5d20e20e20e1", bookName: "Beginner / Level 2 / Unit 20", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 21, quizId: "6d21e21e-6d21-21e1-21e1-6d21e21e21e1", bookName: "Beginner / Level 2 / Unit 21", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 22, quizId: "7d22e22e-7d22-22e1-22e1-7d22e22e22e1", bookName: "Beginner / Level 2 / Unit 22", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 23, quizId: "8d23e23e-8d23-23e1-23e1-8d23e23e23e1", bookName: "Beginner / Level 2 / Unit 23", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 24, quizId: "9d24e24e-9d24-24e1-24e1-9d24e24e24e1", bookName: "Beginner / Level 2 / Unit 24", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 25, quizId: "ad25e25e-ad25-25e1-25e1-ad25e25e25e1", bookName: "Beginner / Level 2 / Unit 25", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 26, quizId: "bd26e26e-bd26-26e1-26e1-bd26e26e26e1", bookName: "Beginner / Level 2 / Unit 26", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 27, quizId: "cd27e27e-cd27-27e1-27e1-cd27e27e27e1", bookName: "Beginner / Level 2 / Unit 27", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
  { id: 28, quizId: "dd28e28e-dd28-28e1-28e1-dd28e28e28e1", bookName: "Beginner / Level 2 / Unit 28", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 29, quizId: "ed29e29e-ed29-29e1-29e1-ed29e29e29e1", bookName: "Beginner / Level 2 / Unit 29", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: false },
  { id: 30, quizId: "fd30e30e-fd30-30e1-30e1-fd30e30e30e1", bookName: "Beginner / Level 2 / Unit 30", bookLink: "https://books.clickivo.com/books.php?comp=1&book=_ClickIVO/L1/S2/191.jpg", isCompleted: true },
];

export default function Quiz({ navigation }) {

  const { language } = useSelector(state => state.locale);
  const strings = useLocalization();

  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [startIdx, setStartIdx] = useState(0);

  const ITEMS_PER_PAGE = 7;
  const INITIAL_START_IDX = 14;

  const visibleBooks = books.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const Content = () => {
    return visibleBooks.map((book, index) => {
      return (
        <View key={index}>
          {/* <Text style={styles.text}>
            {book.bookName}
          </Text> */}
          <View key={index} style={styles.contentContainer}>
            <View style={[
              styles.textContainer,
              {
                gap: book.id == INITIAL_START_IDX ? -8 : 0
              }
            ]}>
              <Text style={[
                styles.text,
                {
                  fontWeight: book.id == INITIAL_START_IDX ? 'bold' : 'normal'
                }
              ]}>{book.bookName}</Text>
              <View style={[styles.badgeContainer,
              {
                display: book.id == INITIAL_START_IDX ? 'flex' : 'none'
              }
              ]}>
                <Text style={styles.badge}>{strings.quiz.last_lesson}</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>X</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.buttonContainer}>
              <BookPreview width="24" height="24" />
            </TouchableOpacity> */}
              <TouchableOpacity style={styles.playButtonContainer}>
                {/* <Play
                width={units.height / 48}
                height={units.height / 48}
                marginHorizontal={units.height / 110}
              /> */}
                <Text style={styles.playButtonText}>{strings.quiz.start}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.seperator,
              {
                display: index == books.length - 1 ? 'none' : 'flex'
              }
            ]}
          />
        </View>
      );
    });
  };

  // Görüntülenen öğeleri hesaplar ve eksik öğeleri doldurur
  const calculateShowItems = () => {
    let displayedItems = books.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    if (displayedItems.length < ITEMS_PER_PAGE) {
      const missingItemsCount = ITEMS_PER_PAGE - displayedItems.length;
      let missingStartIdx = startIdx - missingItemsCount;

      if (missingStartIdx < 0) {
        missingStartIdx = 0;
      }

      if (missingStartIdx + ITEMS_PER_PAGE > books.length) {
        missingStartIdx = Math.max(0, books.length - ITEMS_PER_PAGE);
      }

      displayedItems = books.slice(missingStartIdx, missingStartIdx + ITEMS_PER_PAGE);
    }

    return displayedItems;
  };

  // İlk yükleme veya ITEMS_PER_PAGE değiştiğinde çalışır
  useEffect(() => {
    // Seçilen öğenin indeksini bulur
    let selectedItemIndex = books.findIndex((book) => book.id === INITIAL_START_IDX);

    if (selectedItemIndex !== -1) {
      // Yeni başlangıç indeksi hesaplanır
      const newStartIdx = Math.max(0, selectedItemIndex - Math.floor(ITEMS_PER_PAGE / 2));
      setStartIdx(newStartIdx);
    } else {
      setStartIdx(0);
    }
  }, [books, ITEMS_PER_PAGE]);

  // Görüntülenecek öğeleri hesaplar
  const showItems = calculateShowItems();
  // Yukarı Çık butonunun görünüp görünmeyeceğine karar verir. Eğer ilk öğe görüntüleniyorsa yukarı çık butonu görünmez.
  let showUpButton = showItems.includes(books[0]) || false;
  // Aşağıya In butonunun görünüp görünmeyeceğine karar verir. Eğer son öğe görüntüleniyorsa yukarı çık butonu görünmez.
  let showDownButton = showItems.includes(books[books.length - 1]) || false;

  return (
    <>
      <SafeAreaView style={styles.statusBarColor}></SafeAreaView>
      <StatusBar backgroundColor={colors.WHITE} />
      <View style={styles.container}>
        {/* top menu */}
        <TopMenu
          title={strings.quiz.top_title}
          onPressBack={() => {
            navigation.dispatch(CommonActions.goBack());
          }}
          onPressMenu={() => {
            navigation.toggleDrawer();
          }}
        />
        <ScrollView
          style={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              Genel İngilizce / 21.30 / 10 Dk
            </Text>
          </View>
          <View style={styles.quizContainer}>
            <Text style={styles.title}>{strings.quiz.title}</Text>
            <Text style={styles.quizHeaderText}>
              {strings.quiz.description}
            </Text>
            {books ? <Content /> : null}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: units.width
  },
  scrollViewContainer: {
    marginHorizontal: units.width / 36,
    marginTop: units.width / 24,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size(18),
    color: colors.ORANGE,
    textAlign: 'center',
    marginHorizontal: units.width / 10,
    marginTop: units.height / 72,
    marginBottom: units.height / 30
  },
  headerContainer: {
    backgroundColor: colors.LT_GREY,
    borderRadius: units.height / 72,
    marginBottom: units.height / 48
  },
  headerText: {
    marginVertical: units.height / 48,
    marginHorizontal: units.width / 12,
    fontSize: Fonts.size(14),
    fontFamily: Fonts.type.bold,
    color: colors.BLACK,
    textAlign: 'center'
  },
  quizContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: units.height / 72,
    borderWidth: units.height / 500,
    borderColor: colors.LT_GREY,
    marginBottom: units.height / 36
  },
  quizHeaderText: {
    marginBottom: units.height / 48,
    marginHorizontal: units.width / 36,
    fontSize: Fonts.size(14),
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    color: colors.BLACK,
    textAlign: 'center'
  },
  text: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size(14),
    color: colors.BLACK,
    marginVertical: units.height / 45,
    marginHorizontal: units.width / 25
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  seperator: {
    marginHorizontal: units.width / 25,
    height: units.height / 500,
    backgroundColor: colors.LT_GREY
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  buttonContainer: {
    marginRight: units.width / 24,
  },
  badgeContainer: {
    backgroundColor: colors.ORANGE,
    borderRadius: 10,
    paddingVertical: units.height / 144,
    paddingHorizontal: units.width / 60,
  },
  badge: {
    fontSize: Fonts.size(12),
    color: colors.WHITE,
  },
  playButtonContainer: {
    backgroundColor: colors.BLUE,
    borderRadius: 10,
    borderColor: colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: units.height / 144,
    paddingHorizontal: units.width / 60,
    fontWeight: 'bold',
  },
  playButtonText: {
    fontFamily: Fonts.type.bold,
    fontWeight: 'bold',
    fontSize: PixelRatio.getFontScale() > 3 ? Fonts.size(7) : Fonts.size(12),
    color: colors.WHITE
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: -8,
  }
});
