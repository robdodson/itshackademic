"""
This script generates the metadata for the codeslapp app.
"""

import os
import yaml


class BadStateError(EnvironmentError):
    pass

CATEGORIES = ['web']


def _read_yaml_data(base_dir_path, codelab_dirname, yaml_fname):
    with open(os.path.join(
            base_dir_path, codelab_dirname, yaml_fname), 'r') as f:
        codelab_metadata = yaml.load(f)
    if not codelab_metadata:
        raise BadStateError("%s appears to be empty" % yaml_fname)
    # Generate a link for the codelab.
    codelab_metadata['slug'] = codelab_dirname

    return codelab_metadata


def _generate_step_slugs(codelab_dir_path, codelab_metadata,
                         step_slug_regexp, yaml_fname):
    if 'steps' not in codelab_metadata or not codelab_metadata['steps']:
        raise BadStateError("in %s, %s contains no steps metadata" % (
            codelab_dir_path, yaml_fname))
    for fname in os.listdir(codelab_dir_path):
        match = step_slug_regexp.match(fname)
        if match is not None:
            try:
                codelab_metadata['steps'][int(
                    match.group(2)) - 1]['slug'] = match.group(1)
            except KeyError:
                raise BadStateError(
                    "in %s, the %s file does not contain "
                    "steps metadata" % (codelab_dir_path, yaml_fname))


def _generate_codelab_metadata(base_dir_path, codelab_dirname,
                               step_slug_regexp, yaml_fname):

    codelab_dir_path = os.path.join(base_dir_path, codelab_dirname)
    codelab_metadata = _read_yaml_data(
        base_dir_path, codelab_dirname, yaml_fname
    )
    _generate_step_slugs(codelab_dir_path, codelab_metadata,
                         step_slug_regexp, yaml_fname)
    return codelab_metadata


def _generate_codelabs_by_category(base_dir_path, codelabs, sorted_categories,
                                   yaml_fname):
    codelabs_by_category = dict((category, []) for category in
                                sorted_categories)
    for key in codelabs.keys():
        for category in codelabs[key]['categories']:
            if category not in CATEGORIES:
                raise BadStateError(
                    "In %s, '%s' is an invalid category."
                    "Choose from %s only." %
                    (os.path.join(base_dir_path, key, yaml_fname) ,
                     category,
                     CATEGORIES))
            codelabs_by_category[category].append(
                {'title': codelabs[key]['title'], 'slug': codelabs[key]['slug']}
            )
    # Within each category, sort by title.
    for key in codelabs_by_category:
        codelabs_by_category[key].sort(key=lambda codelab: codelab['title'])
    return codelabs_by_category


def generate_metadata(base_dir_path, step_slug_regexp, yaml_fname):
    metadata = {'categories': CATEGORIES, 'codelabs': {}}

    # Loop through all of the codelab directories and write their
    # metadata to a an object, keyed by directory name
    for codelab_dirname in os.listdir(base_dir_path):
        # If this thing isn't a directory, skip it
        if not os.path.isdir(os.path.join(base_dir_path, codelab_dirname)):
            continue
        # Grab the metadata for this codelab dir
        metadata['codelabs'][codelab_dirname] = \
            _generate_codelab_metadata(base_dir_path, codelab_dirname,
                                       step_slug_regexp, yaml_fname)
    # Segment the codelab metadata by category
    metadata['codelabs_by_category'] = _generate_codelabs_by_category(
        base_dir_path,
        metadata['codelabs'],
        CATEGORIES,
        yaml_fname
    )
    return metadata
