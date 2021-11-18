import S from '@sanity/desk-tool/structure-builder';
import {
  FiCircle,
  FiLayout,
  FiSettings,
  FiSidebar,
  FiSquare,
} from 'react-icons/fi';

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('General')
        .icon(FiSettings)
        .child(S.editor().schemaType('general').documentId('general')),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(FiLayout)
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Frontpage')
        .icon(FiLayout)
        .child(S.editor().schemaType('frontpage').documentId('frontpage')),
      S.listItem()
        .title('Work')
        .icon(FiCircle)
        .child(
          S.list()
            .title('Work')
            .items([
              S.listItem()
                .title('Overview Page')
                .icon(FiSidebar)
                .child(
                  S.editor()
                    .schemaType('overviewPage')
                    .documentId('overviewPage')
                ),
              S.listItem()
                .title('Posts')
                .icon(FiSquare)
                .child(S.documentTypeList('post').title('Posts')),
            ])
        ),
    ]);
