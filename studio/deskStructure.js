import S from '@sanity/desk-tool/structure-builder';
import {
  FiCircle,
  FiLayout,
  FiSettings,
  FiSidebar,
  FiSmile,
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
        .title('Work')
        .icon(FiCircle)
        .child(
          S.list()
            .title('Work')
            .items([
              S.listItem()
                .title('Work')
                .icon(FiSidebar)
                .child(S.editor().schemaType('work').documentId('work')),
              S.listItem()
                .title('Projects')
                .icon(FiSquare)
                .child(S.documentTypeList('project').title('Projects')),
            ])
        ),
      S.listItem()
        .title('Stories')
        .icon(FiSquare)
        .child(
          S.list()
            .title('Stories')
            .items([
              S.listItem()
                .title('Stories')
                .icon(FiSidebar)
                .child(S.editor().schemaType('stories').documentId('stories')),
              S.listItem()
                .title('Posts')
                .icon(FiSquare)
                .child(S.documentTypeList('post').title('Posts')),
            ])
        ),
      S.listItem()
        .title('About')
        .icon(FiSmile)
        .child(S.editor().schemaType('about').documentId('about')),
    ]);
